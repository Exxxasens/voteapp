import { Request, Response, NextFunction } from "express";
import UserNotAuth from "../exceptions/UserNotAuth";
import * as jwt from "jsonwebtoken";

export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        throw new UserNotAuth();
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            return next(error);
        }
        req.user = user as User;
        next();
    });
}
