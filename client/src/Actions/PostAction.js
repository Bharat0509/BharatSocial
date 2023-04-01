import Axios from "../Axios";


import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS } from "../Constants/postConstans";

export const createPost=(formData)=>async(dispatch)=>{
    dispatch({type:CREATE_POST_REQUEST});
    
    try {
       const config = { 
            withCredentials: true ,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data}=await Axios.post(`/posts/create`,formData,config)
        
        dispatch({type:CREATE_POST_SUCCESS,data:data.success})

    } catch (error) {
        dispatch({type:CREATE_POST_FAIL,data:error?.reponse?.message})
       
    }
}


export const getTimeLinePosts=(id)=>async(dispatch)=>{

    dispatch({type:ALL_POSTS_REQUEST});
    
    try {

        const {data}=await Axios.get(`/posts/${id}/timeline`)
        
        dispatch({type:ALL_POSTS_SUCCESS,data:data.posts})

    } catch (error) {
        dispatch({type:ALL_POSTS_FAIL,data:error?.reponse?.message})
       
    }
}


export const deletePost=(postId)=>async(dispatch)=>{

    dispatch({type:DELETE_POST_REQUEST});
    const config = { 
            withCredentials: true ,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    try {

        const {data}=await Axios.delete(`/posts/${postId}`,config)
        
        dispatch({type:DELETE_POST_SUCCESS,data:data.success})

    } catch (error) {
        dispatch({type:DELETE_POST_FAIL,data:error?.reponse?.message})
       
    }
}


//  export const likePost = async () => {
//     try {
//       const res = await axios.put(`https://bharatsocial-infc.onrender.com/post/${data._id}/like`, { userId: user._id });
//       setLikes(prev => prev + 1);
//       setLiked(true);
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   export const dislikePost = async () => {
//     try {
//       const res = await axios.put(`https://bharatsocial-infc.onrender.com/post/${data._id}/dislike`, { userId: userData.user._id });
//       setLikes(prev => prev - 1);
//       setLiked(false);
//     } catch (error) {
//       console.log(error);
//     }
//   }


