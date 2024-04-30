import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";


// creating model from schema.
const CommentModel = mongoose.model('Comment', commentSchema);

export default class CommentRepository{
    async getAllComments(postId){
        try{
            const comments = await CommentModel.find({postId: postId});
            return comments
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async postComment(userId,postId,content){
        try{
            const comment = new CommentModel(userId,postId,content);
            await comment.save()
            return comment;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async deleteComment(commentId,userId){
        try{
            const comment = await CommentModel.findOneAndDelete({_id:commentId, userId:userId});
            return comment;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
    async updateComment(commentId,userId,content){
        try{
            const comment = await CommentModel.findOneAndUpdate({_id:commentId, userId:userId, content:content});
            return comment;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}