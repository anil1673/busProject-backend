import express from "express";
const authRouter=express.Router();
import {loginUser, registerUser} from "../controller/auth.js"

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);







export default authRouter