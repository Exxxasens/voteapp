import Joi, { string } from "joi";

export default interface CreatePollDto {
    pollTitle: string;
    questions: IQuestion[];
}

export const CreatePollSchema = Joi.object({
    pollTitle: Joi.string(),
    questions: Joi.array()
        .required()
        .min(1)
        .items(
            Joi.object({
                title: Joi.string().required(),
                options: Joi.array().items(Joi.string()).required().min(2),
                correct: Joi.string().required(),
            })
        ),
});
