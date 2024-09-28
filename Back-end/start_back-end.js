import express from 'express';

import authenticate_route from "../Back-end/routes/authenticate_route.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';






const web= express();

const PORT= ENV_VARS.PORT;

web.use(express.json()); //it allows to parse req.body

//console.log(PORT);
web.use("/api/v1/auth", authenticate_route);

web.listen(PORT,()=>{
    console.log("back-end server has started on "+PORT);
    connectDB();
});