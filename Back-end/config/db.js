import mongoose from 'mongoose';

import { ENV_VARS } from './envVars.js';

export const connectDB= async()=>{
    try{
        const conn= await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("MongoDB connected: "+conn.connection.host);
    }catch (error){
        console.error("error connection to mongodb: "+error.message);
        process.exit(1); //it means faild to connect
    }
};