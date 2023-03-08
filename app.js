import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import "./db/conn.js"
import cookieParser from "cookie-parser";
import authRouter from "./router/auth.js";
// import userRouter from "./router/user.js";
// import postRouter from "./router/post.js";
import User from "./models/user.js";
// import Post from "./models/post.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import helmet from "helmet"

const app=express();


app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}))
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(cookieParser());
app.use(cors());
// app.use(
//     cors({
//       origin: "http://localhost:3000",
//       credentials: true,
//     })
//   );



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

dotenv.config();





app.use("/auth",authRouter);


app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errorMessage=err.Message||"something went wrong";

    return res.status(errorStatus).json({
        status:errorStatus,
        stack:err.stack,
        message:errorMessage,
        success:false
    })
});


app.listen(5000,(req,res)=>{
    console.log("express connection success")
})


export{cloudinary}