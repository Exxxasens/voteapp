import { NextFunction, Router, Request, Response, response } from "express";
import CreatePollDto, { CreatePollSchema } from "../dto/poll/create.poll.dto";
import PollNotFoundException from "../exceptions/PollNotFoundException";
import Controller from "../interfaces/controller.interface";
import schemaMiddleware from "../middlewares/schema.middleware";
import PollModel from "../models/poll.model";
import PollService from "../services/poll.service";

export default class PollController implements Controller {
    public path = "/api/poll";
    public router = Router();

    constructor() {
        this.router.post("/", schemaMiddleware(CreatePollSchema), this.create);
        this.router.get("/:id", this.get);
    }

    private async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CreatePollDto = req.body;
            const poll = PollService.createPoll(body);
            await poll.save();
            res.status(201).json(poll);
        } catch (error) {
            next(error);
        }
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const poll = await PollModel.findById(id);

            if (!poll) {
                throw new PollNotFoundException();
            }

            res.json(poll);
        } catch (error) {
            next(error);
        }
    }
}
