import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";



// creating model from schema.
const LikeModel = mongoose.model('Like', likeSchema);

export default class LikeRepository{
    async toggleLike(userId,postId){
        try{
            const newLike = new LikeModel({
                userId: userId,
                postId: postId,
            })
            await newLike.save();
        }catch(err){
            console.log(err)
            throw new ApplicationError("Bad Request",400)
        }
    }
}