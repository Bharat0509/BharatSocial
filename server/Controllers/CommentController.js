import catchAsyncError from "../middlewares/catchAsyncError.js";
import commentModel from "../Models/commentModels.js";


//Create a Post
export const newComment=catchAsyncError(async (req,res,next)=>{
    
    const commentData={
        post:req.body.post,
        comment:req.body.comment,
        user:req.user._id
    }
   
    const comment=await commentModel.create(commentData);
    return res.status(201).json(
        {
        success:true,
        comment:comment
        }
    )
})

//get posts
export const getComment =async (req,res)=>{
    const userId=req.params.id;

    try {
        const comment=await commentModel.findB({user:userId});
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
}

// posts
export const getComments=catchAsyncError(async (req,res)=>{
    const postId=req.params.id;
    try {
        const comments=await commentModel.find({post:postId}).populate({
            path:'user',
            select:'_id username profilePicture'}
        );
        res.status(200).json({
            success:true,
            
            comments:{post:postId,comments:comments}
        });
    } catch (error) {
        res.status(500).json(error);
    }

})
