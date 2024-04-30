import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    userId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
    }
    ],
    caption: {type: String,maxLength:[500, "Captions cannot be longer than 500 characters"], required: true,},
    imageUrl: {type: String, required: true},
})