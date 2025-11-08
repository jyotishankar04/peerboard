import type { Request } from "express"

export type JWTExpires = "1d" | "1h" | "1m" | "1w" | "15m" | "30d" | "30m" | "6h" | "7d"

export interface AuthRequest extends Request {
   auth:{
           email: string;
           role: string;
           sessionId?: string;
           userId?: string;
   }
}
export interface IRefreshTokenPayload {
    sessionId: string;
}