import type { CookieOptions, NextFunction, Request, Response } from "express";
import type AuthService from "../services/auth.service";
import { registerSchema } from "../validator";
import type TokenService from "../services/token.service";
import type { OtpService } from "../services/otp.service";
import type UserService from "../services/user.service";
import createHttpError from "http-errors";
import _env from "../config";
import type { AuthRequest } from "../types";


export class AuthController {
    private readonly authService: AuthService
    private readonly tokenService: TokenService
    private readonly otpService: OtpService
    private readonly userService: UserService
    private readonly cookieOptions: CookieOptions = _env.NODE_ENV === "production" ? { secure: true, httpOnly: true, sameSite: "none" } : { secure: false, sameSite: "lax", httpOnly: true }
    constructor(authService: AuthService, tokenService: TokenService, otpService: OtpService, userService: UserService) {
        this.authService = authService
        this.tokenService = tokenService
        this.otpService = otpService
        this.userService = userService
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        const { data: body, success: validationSuccess } = await registerSchema.safeParseAsync(req.body)
        if (!validationSuccess) {
            next(validationSuccess)
            return;
        }
        const user = await this.userService.checkExists({ email: body.email })
        if (user) {
            console.log(user)
            if (user.isVerified) {
                next(createHttpError(400, "User already exists"))
                return;
            }
            else if (user.email && user.id) {
                await this.otpService.sendOtp(user.email, user.id)
                return res.status(201).json({
                    success: true,
                    data: {
                        redirectEndpoint: "/auth/otp-verification?userId=" + user.id,
                    },
                    message: "OTP sent successfully",
                })
            }
            next(createHttpError(400, "User already exists"))
            return;
        }

        const hashedPassword = await this.tokenService.hashPassword(body.password)
        body.password = hashedPassword

        const { data, success } = await this.authService.create(body)
        if (!success) {
            next(createHttpError(500, "Something went wrong"))
            return;
        }

        await this.otpService.sendOtp(data.email, data.id)


        return res.status(201).json({
            success: true,
            data: {
                redirectEndpoint: `/auth/otp-verification?userId=${data.id}&purpose=register`, 
            },
            message: "OTP sent successfully",
        })
    }
    public async verifyOtp(req: Request, res: Response, next: NextFunction) {
        const { userId, code } = req.body;
        const os = req.useragent?.os;
        const browser = req.useragent?.browser;
        const version = req.useragent?.version;
        const source = req.useragent?.source;
        const platform = req.useragent?.platform;

        const userAgent = {
            os,
            browser,
            version,
            source,
            platform
        }

        const { success, message } = await this.otpService.verifyOtp(userId, code);
        if (!success) {
            next(createHttpError(400, message));
            return;
        }
        const user = await this.userService.getUserById(userId);
        if (!user) {
            next(createHttpError(400, "User not found"));
            return;
        }

        const session = await this.tokenService.createSession(user.id, userAgent);
        if (!session) {
            next(createHttpError(500, "Something went wrong"));
            return;
        }

        const refreshToken = await this.tokenService.generateRefreshToken(session.id);

        const accessToken = await this.tokenService.generateAccessToken({ userId: user.id, email: user.email, role: user.role });

        res.cookie("accessToken", accessToken, { ...this.cookieOptions, expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24) });
        res.cookie("refreshToken", refreshToken, { ...this.cookieOptions, expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24) });

        return res.status(200).json({ success: true, message: "OTP verified successfully" });
    }
    public async login(req: AuthRequest, res: Response, next: NextFunction) {
        const { email, password } = req.body
        const os = req.useragent?.os;
        const browser = req.useragent?.browser;
        const version = req.useragent?.version;
        const source = req.useragent?.source;
        const platform = req.useragent?.platform;

        const userAgent = {
            os,
            browser,
            version,
            source,
            platform
        }
        const user = await this.userService.getUserByEmail(email)
        if (!user) {
            next(createHttpError(400, "User not found"))
            return;
        }
        const isValid = await this.tokenService.comparePassword(password, user.password)
        if (!isValid) {
            next(createHttpError(400, "Invalid credentials"))
            return;
        }
        const session = await this.tokenService.createSession(user.id, userAgent)
        if (!session) {
            next(createHttpError(500, "Something went wrong"))
            return;
        }
        const refreshToken = await this.tokenService.generateRefreshToken(session.id)
        const accessToken = await this.tokenService.generateAccessToken({ userId: user.id, email: user.email, role: user.role })
        res.cookie("accessToken", accessToken, { ...this.cookieOptions, expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24) })
        res.cookie("refreshToken", refreshToken, { ...this.cookieOptions, expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24) })
        return res.status(200).json({ success: true, message: "Login successful" })
    }

    public async self(req: AuthRequest, res: Response, next: NextFunction) {
        const userId = req.auth.userId
        if (!userId) {
            next(createHttpError(400, "User not found"))
            return;
        }
        const user = await this.userService.getUserById(userId)
        if (!user) {
            next(createHttpError(400, "User not found"))
            return;
        }

        return res.status(200).json({ success: true, data: { ...user, password: undefined, }, message: "User fetched successfully" })
    }
    public async logout(req: AuthRequest, res: Response, next: NextFunction) {
        if (!req.auth.sessionId) {
            next(createHttpError(400, "User not found"))
            return;
        }
        await this.tokenService.deleteSession(req.auth.sessionId)
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        return res.status(200).json({ success: true, message: "Logout successful" })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async refreshToken(req:AuthRequest, res: Response, next: NextFunction) {
        const refresh = await this.tokenService.rotateTokens(req.cookies.refreshToken)

        res.cookie("accessToken", refresh.accessToken, { ...this.cookieOptions, expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24) })
        res.cookie("refreshToken", refresh.refreshToken, { ...this.cookieOptions, expires: new Date(Date.now() + 7 * 1000 * 60 * 60 * 24) })
        
        return res.status(200).json({ success: true, message: "Refresh token successful" })
    }
}
