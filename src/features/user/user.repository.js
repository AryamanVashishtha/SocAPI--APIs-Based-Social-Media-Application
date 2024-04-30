import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// creating model from schema.
const UserModel = mongoose.model('User', userSchema)

export default class UserRepository{
    async signUp(user){
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err){
            console.log(err);
            if(err instanceof mongoose.Error.ValidationError){
                throw err;
            }else{
                console.log(err);
                throw new ApplicationError("Something went wrong with database", 500);
            }
            
        }
    }
    async signIn(email, password){
        try{
           return await UserModel.findOne({email, password});
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async findByEmail(email) {
        try{
        return await UserModel.findOne({email});
      }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
    async getAll(){
        try{
            let users = UserModel.find();
            return await users;
          }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
          }
    }
    async getUserId(userid){
        try{
            return await UserModel.findOne({_id: userid});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }    
    async updateUserId(userId,newDetails){
        try{
            const {name,gender} = newDetails;
            return await UserModel.findOneAndUpdate({_id:userId, name: name , gender: gender});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }    
}