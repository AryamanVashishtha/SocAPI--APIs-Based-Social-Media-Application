import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

const postRouter = express.Router();
const postController = new PostController;

postRouter.post('/',upload.single('imageUrl'),(req, res, next)=>{
    postController.post(req, res, next)}); // To create a new post
postRouter.get('/all',(req, res, next)=>{
    postController.getAll(req, res, next)}); // Get all posts
postRouter.get('/:id', (req, res, next)=>{
    postController.findID(req, res, next)}); //To find a post from its postid
postRouter.get('/', (req, res, next)=>{
    postController.findUserPosts(req, res, next)}); // Pull using userID
postRouter.delete('/:id',(req, res, next)=>{
    postController.deletePost(req, res, next)}); 
postRouter.put('/:id',upload.single('imageUrl'), (req, res, next)=>{
    postController.updateID(req, res, next)}); //To update an existing post


export default postRouter;