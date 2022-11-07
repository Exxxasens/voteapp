import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/http.exception";

const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error) {
        console.log(error);
    }

    if (error instanceof HttpException) {
        return res.status(error.status).json({
            status: error.status,
            message: error.message,
        });
    }

    if (error) {
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }

    console.log("ERROR");

    next();
};

export default errorMiddleware;
