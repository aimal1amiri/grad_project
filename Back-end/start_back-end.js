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

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ENV_VARS.TMDB_API_KEY
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));