import CommentModel from "./comment.model.js";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import CommentRepository from "./comment.repository.js";

export default class CommentController{

    constructor(){
        this.commentRepository = new CommentRepository();
      }
    async getAllByPostId(req,res){
        const postId = req.params.postId;
        const comments =await this.commentRepository.getAllComments(postId);
        if(!comments){
            throw new ApplicationError("Bad Request",400)
        }
        else{
            res.status(200).send(comments);
        }
    }
    async postComment(req,res){
        const {content} = req.body;
        const userId = req.userID;
        const postId = req.params.postId;
        let id;
        const comment = new CommentModel(id,userId,postId,content)
        const createdComment = await this.commentRepository.postComment(comment);
        res.status(201).send(createdComment);
    }
    async deleteComment(req,res){
        const commentId = req.params.id;
        const userId = req.userID;
        const comment = await this.commentRepository.deleteComment(commentId,userId);
        if(comment<=-1){
            throw new ApplicationError("Bad Request",400)
        }
        else{
            res.status(200).send("Comment deleted successfully");
        }
    }
    async updateComment(req,res){
        const commentId = req.params.id;
        const userId = req.userID;
        const content = req.body.content;
        const comment = await this.commentRepository.updateComment(commentId,userId,content);
        if(comment<=-1){
            throw new ApplicationError("Bad Request",400)
        }
        else{
            res.status(200).send(comment);
        }
    }
}