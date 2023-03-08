import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken"

export const registerUser=async(req,res,next)=>{
try{
    const {name,password,phone,location,imgUrl,email,position}=req.body;
    
    const hashPassword=await bcryptjs.hash(password,10);
    const checkUserAvailability=await User.findOne({email});

    if(checkUserAvailability){
        res.status(400).json({
            message:"email already available",
            error:true,
            errorMessage:"email already available"
        })
    }else{
        await new User({name,email,phone,password:hashPassword,picturePath:imgUrl,location,position}).save().then((user)=>{
            res.status(200).json({
                message:"user registered successfully",
                error:false
            })
        }).catch((error)=>{
            res.status(400).json({
                message:"user register failed",
                error:true,
                errorMessage:error
            })
        })
        
    }


}catch(error){
    next(error)
}
}


export const loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        console.log(email,password)
        const findUser=await User.findOne({email}).then(async(user)=>{
            console.log(user)
             bcryptjs.compare(password,user.password,(err,result)=>{
                if(!result){
                     res.status(400).json({message:"password wrong",error:true,errorMessage:err,type:2})
                    }else{
                        jwt.sign({id:user._id},process.env.SECRET_KEY,(err,token)=>{
                            if(err){
                                 res.status(400).json({message:"jwt error",error:true, errorMessage:err})
                            }else{
                                // res.cookie("jwttoken",token,{httpOnly: false})

                                res.cookie("jwttoken", token, { httponly:false ,secure:false});
                                 res.status(200).json({token,user })
                            }
                        })
                    }
            })
        }).catch((error)=>{
            res.status(400).json({message:"User doesnot exist",error:true,type:1})
        })


    }catch(error){
        next(error)
    }
}