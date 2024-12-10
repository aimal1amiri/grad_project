import express from 'express';
import { authCheck, login, logout, signup } from '../controller/authenticate_controller.js';
import { protectRoutes } from '../middleWare/protectRoutes.js';


const routing=express.Router();



routing.post("/signup", signup);


routing.post("/login", login);

routing.post("/logout", logout);

routing.get("/authenticationCheck", protectRoutes ,authCheck);

export default routing;

