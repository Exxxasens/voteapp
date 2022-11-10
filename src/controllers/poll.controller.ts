import { NextFunction, Router, Request, Response, response } from "express";
import CreatePollDto, { CreatePollSchema } from "../dto/poll/create.poll.dto";
import PollNotFoundException from "../exceptions/PollNotFoundException";
import UserNotAuth from "../exceptions/UserNotAuth";
import Controller from "../interfaces/controller.interface";
import schemaMiddleware from "../middlewares/schema.middleware";
import PollModel from "../models/poll.model";
import PollService from "../services/poll.service";
import { VotePollSchema } from "../dto/poll/vote.poll.dto";
import authMiddleware from "../middlewares/auth.middleware";

export default class PollController implements Controller {
    public path = "/api/poll";
    public router = Router();

    constructor() {
        this.router.post(
            "/",
            schemaMiddleware(CreatePollSchema),
            authMiddleware,
            this.create
        );
        this.router.get("/:id", this.get);
        this.router.get("/", this.getAll);
        this.router.post(
            "/:id/vote",
            schemaMiddleware(VotePollSchema),
            authMiddleware,
            this.vote
        );
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

    private async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let { limit, offset, query } = req.query;
            let parsedLimit = Number(limit) || 0;
            let parsedOffset = Number(offset) || 0;

            if (parsedLimit <= 0 || parsedLimit > 50) {
                parsedLimit = 10;
            }

            if (parsedOffset < 0) {
                parsedOffset = 0;
            }

            console.log(parsedLimit, parsedOffset);

            const polls = PollModel.find(
                query ? { pollTitle: { $regex: query, $options: "i" } } : {}
            )
                .sort({ rating: "desc" })
                .limit(parsedLimit)
                .skip(parsedOffset);

            res.json(await polls);
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

    async vote(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const body = req.body;
            const { username } = req.user;

            const poll = await PollModel.findById(id);

            if (!username) {
                throw new UserNotAuth();
            }

            if (!poll) {
                throw new PollNotFoundException();
            }

            const answers = body.questions;

            const correctAnwsers = poll.questions.map(
                (item, index) => item.correct === answers[index]
            );

            const userAnswers = answers.slice(0, poll.questions.length);

            let countCorrectAnswers = 0;
            correctAnwsers.forEach(
                (item) => (countCorrectAnswers += Number(item))
            );

            const updatedPoll = await PollModel.findOneAndUpdate(
                { _id: String(id) },
                {
                    $inc: {
                        rating: 1,
                    },
                    $push: {
                        votes: {
                            user: username,
                            answers: userAnswers,
                            correct: countCorrectAnswers,
                        },
                    },
                },
                { new: true }
            );

            res.json({
                user: username,
                answers: userAnswers,
                correct: countCorrectAnswers,
            });
        } catch (error) {
            next(error);
        }
    }
}
