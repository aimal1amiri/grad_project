import { generateTokenAndSetCookie } from "../cookies/generateTokens.js";
import { User } from "../models/user-model.js";
import bcryptjs from "bcryptjs";

export async function signup(req,res){
    try{
        const {email,password,username}=req.body;
        console.log("reqbody: "+req.body)

        if(!email || !password || !username){
            console.log(email,password,username)
            return res.status(400).json({success:false, message:"All fields are required!"});

        }

        const emailCheck= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailCheck.test(email)){
            return res.status(400).json({success:false, message:"invalid email, please provide a valid email"});
        }

        if(password <8){
            return res.status(400).json({success:false, message:"invalid password, please write at least 8 characters"})
        }

        const existUserByEmail=await User.findOne({email:email});

        if(existUserByEmail){

            return res.status(400).json({success:false,message:"Email already exists"});

        }

        const existUserByUsername=await User.findOne({username:username});

        if(existUserByUsername){
            return res.status(400).json({success:false,message:"Username already exists"});

        }

        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        const PROFILE_PIC=["/profilePic1.png", "/profilePic2.png","/profilePic3.png"];

        const image=PROFILE_PIC[Math.floor(Math.random()*PROFILE_PIC.length)]; //selecting random image for user profile


        const newUser=new User({
            email,
            password:hashedPassword,
            username,
            image
        });

        
        generateTokenAndSetCookie(newUser._id,res);
            

        await newUser.save();
        
        //remove password from the response
        res.status(201).json({success:true,user:{ ...newUser._doc, password:""}})
        
        
        
        

        

    }catch (error){
        console.log("Error in singup controller ",error.message);

        res.status(500).json({success:false,message:"internal server error"});


    }
}

export async function login(req,res){
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"});
        }

        const user=await User.findOne({email:email});

        if(!user ){
            return res.status(404).json({success:false,message:"Invalid credentials"});
        }

        const isPasswordCorrect=await bcryptjs.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(202).json({success:true, user:{...user._doc,password:""}});
    }catch (error){
        console.log("Error in login controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}
export async function logout(req,res){
    try{
        res.clearCookie("jwt-cineos");
        res.status(200).json({success:true, message:"log out successfully"});

    }catch (error){

        console.log("Error in logout controller",error.message);
        res.status(500).json({success:false, message:"Internal server error"});
    }
}

export async function authCheck(req,res){
    try {
        res.status(200).json({success:true, user: req.user});
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({success:false, message:"Internal server error"});
        
    }
}


//p5o0tmFMLCjdZQ2l
