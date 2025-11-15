import { sendMail } from "../config/mail"; // adjust path as needed
import type { PrismaClient } from "../generated/prisma/client";

export class OtpService {
    constructor(private prisma: PrismaClient) { }

    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    public async sendOtp(email: string, userId: string) {
        const code = this.generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
       
        await this.prisma.emailOtp.deleteMany({
            where: { userId },
        });
        
        // Save OTP in DB
        await this.prisma.emailOtp.create({
            data: {
                userId,
                code,
                is_used: false,
                expiresAt,
            },
        });

        // Build email template
        const html = `
      <div style="font-family:sans-serif; padding:20px;">
        <h2>Email Verification</h2>
        <p>Your one-time password (OTP) is:</p>
        <h1 style="color:#4f46e5;">${code}</h1>
        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

        // Send email
        await sendMail({
            to: email,
            subject: "Your OTP Code",
            html,
        });

        return { success: true, message: "OTP sent successfully" };
    }

    public async verifyOtp(userId: string, code: string) {

        const otpRecord = await this.prisma.emailOtp.findFirst({
            where: { userId, code, is_used: false },
            orderBy: { createdAt: "desc" },
        });

        if (!otpRecord) throw new Error("Invalid OTP");
        if (otpRecord.expiresAt < new Date()) throw new Error("OTP expired");

        await this.prisma.$transaction([
            this.prisma.emailOtp.update({
                where: { id: otpRecord.id },
                data: { is_used: true },
            }),

            this.prisma.user.update({
                where: { id: userId },
                data: { isVerified: true,emailVerifiedAt: new Date() },
            })
        ])

        return { success: true, message: "Verification successful" };
    }
}
