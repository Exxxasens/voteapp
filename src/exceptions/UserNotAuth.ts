import HttpException from "./HttpException";

export default class UserNotAuth extends HttpException {
    constructor() {
        super(401, "User not authenticated");
    }
}
