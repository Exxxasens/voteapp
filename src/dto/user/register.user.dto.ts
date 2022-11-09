import Joi from "joi";

export default interface RegisterUserDto {
    username: string;
}

export const RegisterUserSchema = Joi.object({
    username: Joi.string().required(),
});
