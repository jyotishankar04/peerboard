import { type Request, type Response, type NextFunction, Router } from "express"
import SessionController from "../controllers/session.controller";
import SessionService from "../services/session.service";
import prisma from "../config/prisma";
import { authenticate } from "../middlewares/auth.midddleware";
import type { AuthRequest } from "../types";

const router = Router();

const sessionService = new SessionService(prisma)
const sessionController = new SessionController(sessionService)

router.get("/",authenticate,(req: Request, res: Response, next: NextFunction) => sessionController.getAll(req as AuthRequest, res, next));
router.get("/:id",authenticate,(req: Request, res: Response, next: NextFunction) => sessionController.get(req as AuthRequest, res, next));
router.delete("/:id",authenticate,(req: Request, res: Response, next: NextFunction) => sessionController.delete(req as AuthRequest, res, next));

export default router