import { NextFunction, Response,Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest } from "./script";
dotenv.config();


const authenticateJwt = (req:CustomRequest,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token,process.env.SECRET_KEY||"3ecretkey", (err, user:any) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
}

export default authenticateJwt;