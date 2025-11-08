import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";
import prisma from "../config/prisma";
import { OtpService } from "../services/otp.service";
import UserService from "../services/user.service";
import { authenticate } from "../middlewares/auth.midddleware";
import { parseRefreshToken } from "../middlewares/parse-refresh-token";
import type { AuthRequest } from "../types";

const router = Router();

const tokenService = new TokenService(prisma);
const otpService = new OtpService(prisma);
const authService = new AuthService(prisma);
const userService = new UserService(prisma);
const authController = new AuthController(authService, tokenService, otpService, userService);


router.post("/register", authController.register.bind(authController));
router.post("/verify-otp", authController.verifyOtp.bind(authController));
router.get("/self",authenticate ,(req, res, next) => authController.self(req as AuthRequest, res, next));
router.post("/login", (req, res, next) => authController.login(req as AuthRequest, res, next));
router.get("/logout",authenticate,parseRefreshToken, (req, res, next) => authController.logout(req as AuthRequest, res, next));

router.post("/refresh",parseRefreshToken, (req, res, next) => authController.refreshToken(req as AuthRequest, res, next));

export default router;