import { NextFunction, Router, Request, Response } from "express";
import RegisterUserDto, {
    RegisterUserSchema,
} from "../dto/user/register.user.dto";
import Controller from "../interfaces/controller.interface";
import schemaMiddleware from "../middlewares/schema.middleware";
import UserService from "../services/user.service";

export default class UserController implements Controller {
    public path = "/api/user";
    public router = Router();

    constructor() {
        this.router.post(
            "/login",
            schemaMiddleware(RegisterUserSchema),
            this.register
        );
    }

    private register(req: Request, res: Response, next: NextFunction) {
        try {
            const body: RegisterUserDto = req.body;
            const token = UserService.registerUser(body);

            res.status(201).json({ accessToken: token });
        } catch (error) {
            next(error);
        }
    }
}
