import PostModel from "./post.model.js"
import { ApplicationError } from "../../error-handler/applicationError.js";
import PostRepository from "./post.repository.js";

export default class PostController {

    constructor(){
        this.postRepository = new PostRepository();
      }

    async getAll(req, res) {
        let posts = await this.postRepository.getAll();
        res.status(200).send(posts);
    }
    async post(req, res) {
        const {caption} = req.body;
        const userId = req.userID;
        const imageUrl ='uploads/'+req.file.filename;
        let id;
        const post = new PostModel(
            id,
            userId,
            caption,
            imageUrl
        );
        const createdNewPost = await this.postRepository.post(post)
        res.status(201).send(createdNewPost);
    }
    async findID(req, res) {
        const post = await this.postRepository.findID(req.params.id);
        if(!post){
            throw new ApplicationError("Post does not exist",404)
        }
        res.status(200).send(post);
    }
    async findUserPosts(req,res){
        const userId = req.userID;
        const posts = await this.postRepository.findUserPosts(userId);
        if(!posts){
            throw new ApplicationError("No Posts Found",404)
        }
        else{
            res.status(200).send(posts);
        }
    }
    async deletePost(req, res) {
        const postId = req.params.id;
        const userId = req.userID;
        const deletePost = await this.postRepository.deletePost(postId, userId);
        if(deletePost<=-1){
            throw new ApplicationError("Bad Request",400)
        }
        else{
            res.status(202).send("Post Deleted Successfully");
        }
    }
    async updateID(req, res) {
        const postId = req.params.id;
        const userId = req.userID;
        const caption = req.body.caption;
        const imageUrl ='uploads/'+req.file.filename;
        if(!caption && !imageUrl){
            throw new ApplicationError("Bad Request",400)
        }
        else{
            const post = await this.postRepository.updatePost(postId,userId,caption,imageUrl)
            if(!post){
                throw new ApplicationError("Post not found",404)
            }
            res.status(200).send(post);
        }
    }
    }