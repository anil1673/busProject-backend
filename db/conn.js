import dotenv from "dotenv"
dotenv.config({path:"./config.env"});
import express from "express";
import mongoose, { mongo } from "mongoose";
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("mongoose connection success")
}).catch((error)=>{
    console.log("momgoose error")
});

mongoose.set("strictQuery",true);




;


