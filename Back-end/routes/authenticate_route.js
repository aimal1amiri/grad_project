import express from 'express';
import { login, logout, signup } from '../controller/authenticate_controller.js';


const routing=express.Router();



routing.post("/signup", signup);


routing.post("/login", login);

routing.post("/logout", logout);


export default routing;

