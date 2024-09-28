import { User } from "../models/user-model.js";

export async function signup(req,res){
    try{
        const {email,password,username}=req.body;

        if(!emaill || !password || !username){
            return res.status(400).json({success:false, message:"All fields are required!"});
        }

        const emailCheck= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailCheck.test(email)){
            return res.status(400).json({success:false, message:"invalid email, please provide a valid email"});
        }

        if(!password <8){
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

        const PROFILE_PIC=["/profilePic1.", "/profilePic2.","/profilePic3."];

        const image=PROFILE_PIC[Math.floor(Math.random()*PROFILE_PIC.length)]; //selecting random image for user profile




        const newUser=new User({
            email,
            password,
            username,
            image
        });

        await newUser.save()




    }catch (error){
        console.log("Error in singup controller ",error.message);

        res.status(500).json({success:false,message:"internal server error"});


    }
}

export async function login(req,res){
    res.send("login");
}
export async function logout(req,res){
    res.send("logout");
}


//p5o0tmFMLCjdZQ2l