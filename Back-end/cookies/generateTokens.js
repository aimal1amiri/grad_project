import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";


export const generateTopenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{ expiresIn:"15d"});

    res.cookie("jwt-cineos", token,{maxAge:15*24*60*60*1000, 
        httpOnly:true, //prevent XSS attack
        sameSite:"strict",
        secure:ENV_VARS.NODE_ENV!=="development", //this is for checking or only working in https protocol. but the argument we provided , it says only in development stage it can be http.

    });

    return token;
};