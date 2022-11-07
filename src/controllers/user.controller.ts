import { Router } from "express";
import Controller from "../interfaces/controller.interface";

class UserController implements Controller {
    public path = "/api/user";
    public router = Router();

    constructor() {}

    private register() {}
}
