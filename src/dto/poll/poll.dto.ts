import CreatePollDto from "./create.poll.dto";

export default interface PollDto {
    _id: string;
    pollTitle: string;
    questions: {
        title: string;
        options: string[];
        correct: string;
    }[];
    stats: {
        colmplete: number;
        correct: number;
    };
}
