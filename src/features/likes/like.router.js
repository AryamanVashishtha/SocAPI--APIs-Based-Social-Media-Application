import express from 'express';
import LikeController from './like.controller.js';

const likeRouter = express.Router();
const likeController = new LikeController;


likeRouter.post('/toggle/:postId', (req, res, next)=>{
    likeController.toggleLike(req, res, next)}); // Toggle likes
likeRouter.get('/:id', (req, res, next)=>{
    likeController.getAllByPostId(req, res, next)}); // Get all likes by a postId
export default likeRouter