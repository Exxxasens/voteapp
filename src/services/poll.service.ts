import CreatePollDto from "../dto/poll/create.poll.dto";
import PollModel from "../models/poll.model";

export default class PollService {
    static createPoll(data: CreatePollDto) {
        const poll = new PollModel(data);
        return poll;
    }

    // static vote(id: string, votes: ) {

    // }
}
