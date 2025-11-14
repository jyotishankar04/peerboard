/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types";
import createHttpError from "http-errors";
import type SessionService from "../services/session.service";

class SessionController {
    constructor(private sessionService: SessionService) { }
    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        if (!req.auth.userId) return next(createHttpError(400, "User not found"))

        const sessions = await this.sessionService.getAllSessions({ id: req.auth.userId })
        if (!sessions) return next(createHttpError(500, "Something went wrong"))
        return res.status(200).json({ success: true, message: "Session fetched successfully", data: sessions })
    }
    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        if (!req.auth.userId) return next(createHttpError(400, "User not found"))
        if (!req.params.id) return next(createHttpError(400, "Session not found"))
        try {
            await this.sessionService.deleteSession(req.params.id as string)
        } catch (error) {
            return next(createHttpError(500, "Something went wrong"))
        }
        return res.status(200).json({ success: true, message: "Session deleted successfully" })
    }
    async get(req: AuthRequest, res: Response, next: NextFunction) {
        if (!req.auth.userId) return next(createHttpError(400, "User not found"))
        if (!req.params.id) return next(createHttpError(400, "Session not found"))
        const session = await this.sessionService.getSession(req.params.id as string)
        if (!session) return next(createHttpError(500, "Something went wrong"))
        return res.status(200).json({ success: true, message: "Session fetched successfully", data: session })
    }
}

export default SessionController