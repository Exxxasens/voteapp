import { Request, Response, NextFunction } from "express";
import ValidationException from "../exceptions/validation.exception";
import Joi from "joi";

const schemaMiddleware =
    (schema: Joi.Schema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return next(new ValidationException(error.message));
        }
        req.body = value;
        next();
    };

export default schemaMiddleware;
