import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from 'jsonwebtoken'
import UserModel from "../Models/userModels.js";


export const isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{
    
    const {token}=req.cookies;
    


    if(!token){
        return next(new ErrorHandler("Please Login To Access More..."))
    }
    const decodedData=jwt.verify(token,process.env.JWT_KEY);

    req.user=await UserModel.findById(decodedData.id);
    console.log("USER VERIFIED WITH TOKEN ",token);
    next();

})
export const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
       
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}

