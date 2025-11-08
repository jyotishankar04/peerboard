import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken"
import _env from "../config";
import type { JWTExpires } from "../types";
import type { PrismaClient } from "../generated/prisma/client";

class TokenService {
    private saltNumber = 10
    constructor(private prisma: PrismaClient) { }
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(this.saltNumber)
        password = await bcrypt.hash(password, salt)
        return password
    }
    async comparePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
    async createSession(userId: string, userAgent: { os?: string; browser?: string; version?: string; source?: string; platform?: string }) {
        const session = await this.prisma.session.create({
            data: {
                user: { connect: { id: userId } },
                lastLogin: new Date(),
                userAgent: JSON.stringify(userAgent),
                loginTime: new Date(),
                isActive: true,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // temporary, can adjust
            },
        });
        return session;
    }

    async generateAccessToken(data: { userId: string, email: string, role: string }) {
        const accessToken = jwt.sign(data, _env.JWT_SECRET, { expiresIn: _env.JWT_EXPIRES_IN as JWTExpires })
        return accessToken
    }
    public async generateRefreshToken(sessionId: string) {
        const token = jwt.sign({ sessionId }, _env.JWT_REFRESH_SECRET, { expiresIn: _env.JWT_REFRESH_EXPIRES_IN as JWTExpires })

        return token;
    }
    public async decodeRefreshToken(token: string) {
        const decoded = jwt.decode(token);

        // Make sure it's an object
        if (!decoded || typeof decoded === "string") {
            throw new Error("Invalid token");
        }

        // Type assertion
        const payload = decoded as JwtPayload & { sessionId?: string };
        if (!payload.sessionId) throw new Error("Invalid token: sessionId missing");

        const session = await this.prisma.session.findUnique({
            where: { id: payload.sessionId },
            include: { user: true },
        });

        if (!session) throw new Error("Session not found");

        return session;
    }
    public async deleteSession(sessionId: string) {
        await this.prisma.session.delete({
            where: { id: sessionId },
        });
    }
    public async decodeAccessToken(token: string) {
        const decoded = jwt.decode(token);
        if (!decoded || typeof decoded === "string") throw new Error("Invalid token");
        const payload = decoded as JwtPayload & { userId?: string, email?: string, role?: string };
        if (!payload.userId) throw new Error("Invalid token: userId missing");
        if (!payload.email) throw new Error("Invalid token: email missing");
        if (!payload.role) throw new Error("Invalid token: role missing");
        return payload;
    }

    public async rotateTokens(refreshToken: string) {
        const session = await this.decodeRefreshToken(refreshToken);
        if(!session) throw new Error("Invalid token");
        const newAccessToken = await this.generateAccessToken({ userId: session.user.id, email: session.user.email, role: session.user.role });
        const newRefreshToken = await this.generateRefreshToken(session.id);
        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

export default TokenService;