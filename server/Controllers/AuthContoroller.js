import UserModel from "../Models/userModels.js";
import bcrypt from 'bcrypt';
import  sendToken  from "../utils/jwtToken.js";
import ErrorHandler from "../utils/ErrorHandler.js";


//Register new user
export const registerUser=async (req,res,next)=>{
    const {username,password,email,name}=req.body;
    try {
        const user=await UserModel.create({username,password,email,name});
        if(!user) return next(new ErrorHandler("User Not Found",404))
        sendToken(user,201,res)
    } 
    catch (error) {
       return next(new ErrorHandler(`Internal Server Error : ${error} `,500))
    }
}

//Login user

export const loginUser=async (req,res,next)=>{
        const {username,password}=req.body;

        try {
            
             const user=await UserModel.findOne({username:username})
             if(!user) return next(new ErrorHandler("User Not Found",404))
       
        
            const isValid=await bcrypt.compare(password,user.password);
            
           if(!isValid){
            return next(new ErrorHandler("Access Denied",403))
           }
           else{
            sendToken(user,200,res);
           }
        } 
        catch (error) {
            return next(new ErrorHandler(`Unknown Error Encountered : ${error} `,404))
        } 
}