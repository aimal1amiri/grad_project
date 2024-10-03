//this file is for authentication of users. suppose every unauthenticated user cant access movie trailers or movie itself. so first in this middle ware , it will check if user is authenticate or not. later this concept we can use it for payments too.

import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import { ENV_VARS } from "../config/envVars.js";

//look in the pretheses -next- keyword is used. if you look at -start_back-end- file in web routes end point, we have two functions one is -protectRoutes- and another is for other tasks. when the middleware function task is completed then it will allow the another fuction to do its job. so that is why we used -next- keyword in middleware to do that job for us

export const protectRoutes = async (req,res,next) => {
    try {
        const token= req.cookies["jwt-cineos"]

        if(!token){
            return res.status(401).json({success:false, message:" unauthorized, there is no token"});
        }

        const decoding=jwt.verify(token, ENV_VARS.JWT_SECRET);

        if(!decoding){
            return res.status(401).json({success:false, message:"invlaid token"});
        }

        const user= await User.findById(decoding.userId).select("-password");

        if(!user){
            return res.status(400).json({success:false,message:"user is not founded"});
        }

        req.user=user;

        next()

        
    } catch (error) {

        console.log("error in protectRoutes middleware: ",error);
        res.status(500).json({success:false, message:"internal server error"});
        
    }
};