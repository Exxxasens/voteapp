import express, { Express } from "express";
import Controller from "./interfaces/controller.interface";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware";

class Server {
    public app: Express = express();

    constructor(controllers: Controller[]) {
        this.init();

        this.useControllers(controllers);
    }

    private useControllers(controllers: Controller[]) {
        controllers.forEach((controller) =>
            this.app.use(controller.path, controller.router)
        );
    }

    private connectDatabase() {
        const databaseURL = process.env.DATABASE_URL;
        if (!databaseURL) {
            console.log("Please, provide database url to connect database");
            return;
        }
        mongoose.connect(databaseURL);
    }

    private init() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(errorMiddleware);
    }
}
