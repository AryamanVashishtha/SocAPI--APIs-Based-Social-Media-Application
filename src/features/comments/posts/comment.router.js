import express from 'express';
import CommentController from './comment.controller.js';

const commentRouter = express.Router();
const commentController = new CommentController;


commentRouter.get('/:postId', (req, res, next)=>{
    commentController.getAllByPostId(req, res, next)}); // Get all comments by a postId
commentRouter.post('/:postId', (req, res, next)=>{
    commentController.postComment(req, res, next)}); // Post a new comment
    commentRouter.delete('/:id', (req, res, next)=>{
        commentController.deleteComment(req, res, next)});
commentRouter.put('/:id', (req, res, next)=>{
    commentController.updateComment(req, res, next)}); // Update an existing comment


export default commentRouter