import Joi from "joi";

export default interface VotePollDto {
    questions: string[];
}

export const VotePollSchema = Joi.object({
    questions: Joi.array().min(1).required().items(Joi.string()),
});
