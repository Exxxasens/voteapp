import HttpException from "./HttpException";

export default class PollNotFoundException extends HttpException {
    constructor() {
        super(404, "Poll with given id not found");
    }
}
