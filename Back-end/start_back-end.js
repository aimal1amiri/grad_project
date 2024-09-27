import express from 'express';
import authenticate_route from "../Back-end/routes/authenticate_route.js";


const web= express();

web.use("/api/v1/auth", authenticate_route);

web.listen(5000,()=>{
    console.log("back-end server has started on 5000");
});