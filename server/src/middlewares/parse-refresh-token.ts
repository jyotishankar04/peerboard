import { expressjwt } from "express-jwt";
import _env from "../config";

export const parseRefreshToken = expressjwt({
    secret: _env.JWT_REFRESH_SECRET!,
    algorithms: ["HS256"],
    getToken: (req) => {
        if (req.cookies.refreshToken) {
            return req.cookies.refreshToken;
        }
        return null;
    },
});

