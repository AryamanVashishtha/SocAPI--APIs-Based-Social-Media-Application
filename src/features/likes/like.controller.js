import LikeModel from "./like.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import LikeRepository from "./like.repository.js";

export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
      }
    async toggleLike(req,res){
        const userId = req.userID;
        const postId = req.params.postId;
        // Toggles Like
        const like = await this.likeRepository.toggleLike(userId,postId);
        res.status(200).send(like)
    }
    getAllByPostId(req,res){
        const postId = req.params.id;
        const likes = LikeModel.getAllLikes(postId);
        if(!likes){
            throw new ApplicationError("Bad Request",400)
        }
        else{
            res.status(200).send(likes)
        }
    }
}