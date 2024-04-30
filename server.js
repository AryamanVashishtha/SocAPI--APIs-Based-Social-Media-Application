//import external dependancies 
import express from 'express';
import swagger from 'swagger-ui-express'
import dotenv from "dotenv";

//import internal dependencies
import userRouter from './src/features/user/user.router.js';
import postRouter from './src/features/posts/post.router.js';
import commentRouter from './src/features/comments/posts/comment.router.js';
import likeRouter from './src/features/likes/like.router.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import apiDocs from './swagger.json' assert {type:'json'};

import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import mongoose from 'mongoose';


// Create Server
const server = express();

// load all the environment variables in application
dotenv.config();

// CORS policy configuration
server.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'http://localhost:5500'
    );
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    // return ok for preflight request.
    if (req.method == 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
  

server.use(express.json());
server.use(loggerMiddleware)
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

server.use("/api/users",userRouter);
server.use("/api/posts",jwtAuth,postRouter);
server.use("/api/comments",jwtAuth,commentRouter);
server.use("/api/likes",jwtAuth,likeRouter);

// Error Handling

server.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
    }
    // server errors.
    res
    .status(500)
    .send(
    'Something went wrong, please try later'
    );
    });



// create server instance
const port = 8000;
server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    connectUsingMongoose();
})

