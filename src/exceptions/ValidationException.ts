import HttpException from "./HttpException";

export default class ValidationException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
