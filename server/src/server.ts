import express, { type Request, type Response, type NextFunction } from "express"
import logger from "./config/logger";
import type { HttpError } from "http-errors";
import { express as useragent } from 'express-useragent';
import cookieParser from "cookie-parser";
import cors from "cors"
import _env from "./config";
import authRoutes from "./routes/auth.route";
import sessionRoutes from "./routes/session.route";

const app = express();

app.use(express.json());
app.use(useragent());

app.use(cookieParser());
app.use(cors({
    origin: [_env.FRONTEND_URL],
    credentials: true
}))

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} ${req.useragent?.os} ${req.useragent?.browser} ${req.useragent?.version} ${req.useragent?.source} ${req.useragent?.platform}`);
    next();
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.get('/health', (req:Request, res) => {

    res.status(200).send({
        success: true,
        data: {
            os: req?.useragent?.os,
            browser: req?.useragent?.browser,
            version: req?.useragent?.version,
            source: req?.useragent?.source,
            platform: req?.useragent?.platform
        }
    });
})



// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        error: [
            {
                type: err.name,
                message: err.message,
                path: "",
                location: "",
            },
        ],
        success: false,
        message: err.message,
    });
});



export default app;

