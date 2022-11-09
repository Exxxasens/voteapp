import * as mongoose from "mongoose";
import PollDto from "../dto/poll/poll.dto";

const PollSchema = new mongoose.Schema<PollDto>(
    {
        pollTitle: {
            type: String,
            required: true,
        },
        questions: [
            {
                title: String,
                options: [String],
                correct: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);
/*
userSchema.virtual('posts', {
    ref: 'Device',
    localField: '_id',
    foreignField: 'owner',
  });
  
*/

PollSchema.set("toJSON", {
    transform(doc, ret) {
        ret.questions.forEach(
            (item: { correct?: string }) => delete item.correct
        );
        return ret;
    },
});

const PollModel = mongoose.model("Poll", PollSchema);

export default PollModel;
