import _env from "../config";
import { expressjwt } from "express-jwt";


export const authenticate = expressjwt({
    secret: _env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.cookies.accessToken) {
            return req.cookies.accessToken;
        }
        return null
    }
    
})