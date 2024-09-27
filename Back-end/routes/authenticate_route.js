import express from 'express';
import { login, logout, signup } from '../controller/authenticate_controller.js';


const routing=express.Router();

routing.get("/signup", signup);


routing.get("/login", login)

routing.get("/logout", logout);


export default routing;

