import UserModel from "../Models/userModels.js";
import bcrypt from 'bcrypt'
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/jwtToken.js";
import mongoose from "mongoose";


export const getUser=async (req,res,next)=>{
    const id=req.params.id;
    try {
        const user=await UserModel.findById(id);
        if(!user) res.status(404).json("User Not Found !!");
        else{
        const {password,...otherDetails}=user._doc;
        res.status(200).json(
            {   success:true,
                user:otherDetails
            })}
    } catch (error) {
        return next(new ErrorHandler(`Unexptected Error Occured : ${error} `,500))
   
    }   
}

//get Users
export const getUsers=async (req,res,next)=>{
    const name=req.query.name.toString();
    let q='/'+name+'/i';
    q=eval(q);
    try {
        const users=await UserModel.find({username:q},'name username _id');
        users.map((user)=>{
            return user.password=null;
            
        })
        res.status(200).json({success:true,users:users});
    } catch (error) {
        return next(new ErrorHandler(`Unexptected Error Occured : ${error} `,500))
        
    }
    
    
}


export const loadUser=async (req,res,next)=>{
        if(!req.user) return next(new ErrorHandler(`User Not Found  `,404))
        sendToken(req.user,200,res)
}

//Update user
export const updateUser=async (req,res,next)=>{
    const id=req.params.id;
    const {currentUserId,currentUserAdminStatus,password}=req.body;

    if(id==currentUserId || currentUserAdminStatus){
        try {
            if(password){
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(password,salt);
            }

            const user=await UserModel.findByIdAndUpdate(id,req.body,{new:true});

            sendToken(user,200,res);
            
        } catch (error) {
           return next(new ErrorHandler(`Unexptected Error Occured : ${error} `,500))
        }
    }

}



//Delete user
export const deleteUser=async (req,res,next)=>{
    const id=req.params.id;
    const {currentUserId,currentUserAdminStatus}=req.body;

    if(id==currentUserId || currentUserAdminStatus){
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User Deleted Successfully !!");
             
        } catch (error) {
            return next(new ErrorHandler(`Unexptected Error Occured : ${error.reponse.message} `,500))
        }
    }
}



//Follow a User
export const followUser=async (req,res,next)=>{
    const id=mongoose.Types.ObjectId(req.params.id);

const currentUserId = mongoose.Types.ObjectId(req.user._id) 


    if(currentUserId===id){
       return next(new ErrorHandler("Action Forbidden !!",403))

    }
    else{
        try {

            const followUser=await UserModel.findById(id);
            const followingUser=await UserModel.findById(currentUserId);

            if(!followUser.followers.includes(currentUserId))
            {
               await followUser.updateOne({$push:{followers:currentUserId}});

               await followingUser.updateOne({$push:{followings:id}});

                res.status(200).json({success:true,data:"User Followed !"});
            }
            else{
                return next(new ErrorHandler("User is Already Followed by you !!",403))
                
            }
            

        } catch (error) {
        
           return next(new ErrorHandler(`Unexptected Error Occured : ${error.response} `,500))
        }
    }

}




//Unfollow User

export const unFollowUser=async (req,res,next)=>{
    const id=mongoose.Types.ObjectId(req.params.id);

const currentUserId = mongoose.Types.ObjectId(req.user._id) 


    if(currentUserId===id){
        return next(new ErrorHandler("Action Forbidden !!",403))

    }
    else{
        try {

            const followUser=await UserModel.findById(id);
            const followingUser=await UserModel.findById(currentUserId);

            if(followUser.followers.includes(currentUserId))
            {
               await followUser.updateOne({$pull:{followers:currentUserId}});

               await followingUser.updateOne({$pull:{followings:id}});

                res.status(200).json({success:true,data:"User UnFollowed !"});
            }
            else{
                return next(new ErrorHandler("User is Already UnFollowed by you !!",403))
            }
            
        } catch (error) {
            return next(new ErrorHandler(`Unexptected Error Occured : ${error} `,500))
        }
    }

}