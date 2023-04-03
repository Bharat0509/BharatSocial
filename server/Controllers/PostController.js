import PostModel from "../Models/postModels.js";
import mongoose from 'mongoose'
import UserModel from '../Models/userModels.js'
import cloudinary from 'cloudinary'
import ErrorHandler from '../utils/ErrorHandler.js'
import catchAsyncError from "../middlewares/catchAsyncError.js";


//Create a Post
export const createPost=catchAsyncError(async (req,res,next)=>{
    
    const postData={
        description:req.body.description,
        user:req.user._id
    }
    if(req.body.postImage){
        let myCloud=await cloudinary.v2.uploader.upload(req.body.postImage,{
            folder:"postImages",   
        });
        postData.postImage=myCloud;
    }
    
    const post=await PostModel.create(postData);
    return res.status(201).json(
        {
        success:true,
        post:post
        }
    )
})

//get posts
export const getPost =async (req,res)=>{
    const id=req.params.id;

    try {
        const post=await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

// posts
export const getPosts=async (req,res)=>{
   
    const userId=req.params.id;
    
    try {
        const posts=await PostModel.find({user:userId}).populate({
            path:'user',
            select:'_id username profilePicture'}
        );
        res.status(200).json({
            success:true,
            posts:posts
        });
    } catch (error) {
        res.status(500).json(error);
    }

}
//edit post
export const updatePost =async (req,res)=>{
    const postId=req.params.id;
    const {userId}=req.body;

    try {
        const post=await PostModel.findById(postId);
        if(post.userId===userId){
            const post=await post.updateOne({$set:req.body});
            res.status(200).json({post});
        }
        else{
            res.status(403).json("Action Forbidden !!")
        }
    } catch (error) {
        res.status(500).json(error);
    }

     
}


//delete posts

//Delete User Post 
export const deletePost=catchAsyncError(async (req,res,next)=>{
    
    const post=await PostModel.findById(req.params.id);
   if(!post) return next(new ErrorHandler("Post Doen Not Exist With Given Id",404))
    const imageId=post.postImage.public_id;
    if(imageId) await cloudinary.v2.uploader.destroy(imageId);
    
    await post.remove();
    res.status(200).json({
        success:true,
        message:"Post Deleted Successfully"
    })
})

//Like a post
export const likePost=async (req,res,next)=>{
    
    const postId=req.params.id;
    const {user:userId}=req.body;

    if(!userId) return next(new ErrorHandler("Something went Wrong",500))
    try {
        const post=await PostModel.findById(postId);
       
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}});
            res.status(200).json({
                success:true,
                post:"Post Liked "
            }); 
        } else{
            return next(new ErrorHandler("Actions Forbidden",403))
        }
        
    } catch (error) {
        return next(new ErrorHandler("Actions Forbidden",403))
    }
}

//Dislike a Post
export const dislikePost=async (req,res,next)=>{
    const postId=req.params.id;
    const {user:userId}=req.body;
    try {
        const post=await PostModel.findById(postId);
        if(post.likes.includes(userId)){
            await post.updateOne({$pull:{likes:userId}});
            res.status(200).json({
                success:true,
                post:"Post Disliked "
            }); 
        } else{
            return next(new ErrorHandler("Actions Forbidden",403))
            
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
}




//Get TimeLinePosts

export const getTimeLinePosts=async (req,res,next)=>{
    const userId=req.params.id;

    try {
        const currentUserPosts=await PostModel.find({user:userId}).populate({
            path:"user",
            select:"_id username profilePicture"
    });
        const followingPosts=await UserModel.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId)
                },
            },
            {   
                $lookup:{
                    from :"posts",
                    localField:'followings',
                    foreignField:"user",
                    as:"followingPosts"

                }
                
            },{
                $project:{
                    followingPosts:1,
                    _id:0
                }
            }
        ])
        const posts=(currentUserPosts.concat(...followingPosts[0].followingPosts).sort(
            (a,b)=>{
                return b.createdAt-a.createAt;
            }
        ).reverse());
        res.status(200).json(
            {
                success:true,
                posts:posts
            }
        )
    } catch (error) {
        return next(new ErrorHandler( `Error :${error?.response?.data?.message}` ,500))
    }
}