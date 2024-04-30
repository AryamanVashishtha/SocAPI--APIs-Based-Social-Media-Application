import express from 'express';
import UserController from './user.controller.js';

const userRouter = express.Router();
const userController = new UserController;


userRouter.post('/signup', (req, res, next)=>{
    userController.signUp(req, res, next)});
userRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)});
userRouter.get('/logout', (req, res)=>{
    userController.logOut(req, res)});
userRouter.get('/logout-all-devices', (req, res)=>{
    userController.logOutAll(req, res)});
userRouter.get('/get-all-details',(req, res, next)=>{
    userController.getAll(req, res, next)});
userRouter.get('/get-details/:userid',(req, res, next)=>{
    userController.getUserId(req, res, next)});
userRouter.put('/update-details/:userid',(req, res, next)=>{
    userController.updateUserId(req, res, next)});

export default userRouter;