import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    userId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
    }
    ],
    postId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required: true
        }
    ],
    content: {type: String,maxLength:[100, "Captions cannot be longer than 100 characters"], required: true,}
})