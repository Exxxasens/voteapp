import express, { Express } from "express";
import Controller from "./interfaces/controller.interface";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware";

export default class Server {
    public app: Express = express();

    constructor(controllers: Controller[]) {
        this.init();
        this.useControllers(controllers);
        this.connectDatabase().then(() => console.log("database is connected"));
        this.useErrorMiddleware();
    }

    private useErrorMiddleware() {
        this.app.use(errorMiddleware);
    }

    private connectDatabase() {
        const databaseURL = process.env.DATABASE_URL;
        const connection = mongoose.connect(databaseURL);
        return connection;
    }

    private useControllers(controllers: Controller[]) {
        controllers.forEach((controller) =>
            this.app.use(controller.path, controller.router)
        );
    }

    private init() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public start() {
        const port = process.env.PORT;

        this.app.listen(port, () => {
            console.log("server is running on port: " + port);
        });
    }
}
