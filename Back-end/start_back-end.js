import express from 'express';

import authenticate_route from "../Back-end/routes/authenticate_route.js";
import movieRoutes from "./routes/movie_routes.js"
import tvShowRoutes from "./routes/tvShow_routes.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoutes } from "./middleWare/protectRoutes.js";
import cookieParser from 'cookie-parser';
 





const web= express();

const PORT= ENV_VARS.PORT;

web.use(express.json()); //it allows to parse req.body
web.use(cookieParser());

//console.log(PORT);

web.use("/api/v1/auth", authenticate_route);
web.use("/api/v1/movie", protectRoutes , movieRoutes);
web.use("/api/v1/tvshow", protectRoutes ,tvShowRoutes);

web.listen(PORT,()=>{
    console.log("back-end server has started on "+PORT);
    connectDB();
});


  
