import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const PostModel = mongoose.model('Post', postSchema);

export default class PostRepository{
    async getAll(){
        try{
            const posts = PostModel.find();
            return await posts;
        }catch(err){
            new ApplicationError ("Something went wrong with the database", 500)
        }
    }
    async post(post){
        try{
            const newPost = new PostModel(post);
            await newPost.save();
            return newPost;
        }catch(err){
            new ApplicationError ("Something went wrong with the database", 500)
        }
    }
    async findID(postId){
        try{
            const post = PostModel.findOne({_id:postId})
            return await post;
        }catch(err){
            new ApplicationError ("Something went wrong with the database", 500)
        }
    }
    async findUserPosts(userId){
        try{
            const posts = PostModel.find({userId:userId})
            return await posts;
        }catch(err){
            new ApplicationError ("Something went wrong with the database", 500)
        }
    }
    async deletePost(postId, userId){
        try{
            const posts = PostModel.findOneAndDelete({userId:userId, _id: postId})
            return await posts;
        }catch(err){
            new ApplicationError ("Something went wrong with the database", 500)
        }
    }
    async updatePost(postId,userId,caption,imageUrl){
        try{
            const posts = PostModel.findOneAndUpdate({_id: postId, userId:userId,caption: caption,imageUrl: imageUrl })
            return await posts;
        }catch(err){
            new ApplicationError ("Something went wrong with the database", 500)
        }
    }
}