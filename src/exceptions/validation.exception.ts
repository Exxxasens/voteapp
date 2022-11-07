import HttpException from "./http.exception";

export default class ValidationException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
