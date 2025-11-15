import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../types";
import type UserService from "../services/user.service";
import { onboardUserSchema, updateUserSchema } from "../validator";
import createHttpError from "http-errors";

export class UserController {
    constructor(
        private readonly userService: UserService) {
    }
    // UserController methods and properties
    async me(req: AuthRequest, res: Response, next: NextFunction) {
        if (!req.auth.userId) {
            next(createHttpError(401, "Unauthorized"));
            return;
        }
        const user = await this.userService.getUserById(req.auth.userId, {
            socialInfo: true,
            userPreference: true,
            userExtraInfo: true
        });
        if(!user){
            next(createHttpError(404, "User not found"));
            return;
        }
        return res.status(200).json({ success: true, data: user , message: "User fetched successfully" })
    }
    async getUserByUsername(req: Request, res: Response, next: NextFunction) {
        const { username } = req.params;
        // Implementation for fetching user by username
        return res.status(200).json({ success: true, message: `User ${username} fetched successfully` })
    }
    async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
        const userId = req.auth.userId!;

        const updateData = updateUserSchema.safeParse(req.body);
        if (!updateData.success) {
            next(updateData.error);
            return;
        }

        const user = await this.userService.updateUser({ userId, updateData: updateData.data });
        if (!user) {
            next(createHttpError(500, "Something went wrong"));
            return;
        }
        return res.status(200).json({ success: true, message: "User updated successfully" });
    }
    async onboardUser(req: AuthRequest, res: Response, next: NextFunction) {
        const validator = onboardUserSchema.safeParse(req.body);
        if (!validator.success) {
            next(validator.error);
            return;
        }
        const onboardData = validator.data;
        const user = await this.userService.onboardUser({ userId: req.auth.userId!, onboardData });

        if (!user) {
            next(createHttpError(500, "Something went wrong"));
            return;
        }
        return res.status(200).json({ success: true, data: user, message: "User onboarded successfully" });
    }
}