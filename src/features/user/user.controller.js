import { ApplicationError } from "../../error-handler/applicationError.js";
import UserRepository from './user.repository.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "./user.model.js";

export default class UserController {
    constructor(){
        this.userRepository = new UserRepository();
      }

    async signUp(req, res, next) {
        const {
          name,
          email,
          password,
          gender
        } = req.body;
        try{
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new UserModel(
          name,
          email,
          hashedPassword,
          gender
        );
        await this.userRepository.signUp(user);
        res.status(201).send(user);
      }catch(err){
        next(err);
      }
      }
    async signIn(req, res) {
        try{
            // 1. Find user by email.
          const user = await this.userRepository.findByEmail(req.body.email);
          if(!user){
            return res
              .status(400)
              .send('Incorrect Credentials');
          }else{
            // 2. Compare password with hashed password.
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result){
       // 3. Create token.
       const token = jwt.sign(
        {
          userID: user._id,
          email: user.email,
        },
        'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
        {
          expiresIn: '1h',
        }
      );
      // 4. Send token.
      return res.status(200).send(token);
            }else{
              return res
              .status(400)
              .send('Incorrect Credentials');
            }
          }
          }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }
    async logOut(req,res){
        res.clearCookie('jwt').send("Logged Out");
    }
    async logOutAll(req,res){
        res.user.cookies=[];
        res.status(201).send("Logged Out from all devices");
    }
    async getAll(req,res){
      const users = await this.userRepository.getAll();
      res.status(200).send(users);
  }
    async getUserId(req,res){
      const userid = req.params.userid;
      const details = await this.userRepository.getUserId(userid);
      res.status(200).send(details);
    }
    async updateUserId(req,res){
      const newDetails = req.body;
      const userId = req.params.userid;
      // const {name,gender} = newDetails;
      const updatedDetails = await this.userRepository.updateUserId(userId,newDetails);
      res.status(201).send(updatedDetails);
    }
}