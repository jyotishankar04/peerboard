import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import UserService from "../services/user.service";
import prisma from "../config/prisma";
import { authenticate } from "../middlewares/auth.midddleware";
import type { AuthRequest } from "../types";


const router = Router();
const userService = new UserService(prisma);
const userController = new UserController(userService);


router.get("/",authenticate ,(req, res, next) => userController.me(req as AuthRequest, res, next));
router.get("/:username", (req, res, next) => userController.getUserByUsername(req, res, next));
router.post("/onboard", authenticate ,(req, res, next) => userController.onboardUser(req as AuthRequest, res, next));
export default router;