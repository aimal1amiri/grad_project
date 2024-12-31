import express from 'express';

import authenticate_route from "../Back-end/routes/authenticate_route.js";
import movieRoutes from "./routes/movie_routes.js"
import tvShowRoutes from "./routes/tvShow_routes.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoutes } from "./middleWare/protectRoutes.js";
import cookieParser from 'cookie-parser';
import searchRoutes from './routes/search_routes.js'
import cors from "cors"
import path from 'path';
 





const web= express();

const PORT= ENV_VARS.PORT;

const __dirname = path.resolve();
    

web.use(express.json()); //it allows to parse req.body
web.use(cookieParser());

//console.log(PORT);

web.use("/api/v1/auth", authenticate_route);
web.use("/api/v1/movie", protectRoutes , movieRoutes);
web.use("/api/v1/tvshow", protectRoutes ,tvShowRoutes);
web.use("/api/v1/search", protectRoutes, searchRoutes);


if(ENV_VARS.NODE_ENV === 'production'){
    web.use(express.static(path.join(__dirname, "/Front-end/dist")));

    web.use("*",(req,res) => {
        res.sendFile(path.resolve(__dirname, "Front-end" , "dist", "index.html"));
    })
}

web.listen(PORT,()=>{
    console.log("back-end server has started on "+PORT);
    connectDB();
});


  
