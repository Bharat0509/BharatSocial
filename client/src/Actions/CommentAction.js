import Axios from "../Axios";
import { ALL_COMMENTS_FAIL } from "../Constants/commentConstant.js";
import { ALL_COMMENTS_SUCCESS } from "../Constants/commentConstant.js";
import { ALL_COMMENTS_REQUEST } from "../Constants/commentConstant.js";
import { CREATE_COMMENTS_FAIL, CREATE_COMMENTS_REQUEST, CREATE_COMMENTS_SUCCESS } from '../Constants/commentConstant.js'
export const newComment=(commentData)=>async(dispatch)=>{
    dispatch({type:CREATE_COMMENTS_REQUEST});
    
    try {
       const config = { 
            withCredentials: true ,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data}=await Axios.post(`/comments/new`,commentData,config)
        console.log("Comment added successfullu ",data);
        dispatch({type:CREATE_COMMENTS_SUCCESS,data:data.success})

    } catch (error) {
        console.log("Comment added error ",error);
        dispatch({type:CREATE_COMMENTS_FAIL,data:error?.reponse?.message})
       
    }
}


export const getComments=(postId)=>async(dispatch)=>{
    dispatch({type:ALL_COMMENTS_REQUEST});
    
    try {
       const config = { 
            withCredentials: true ,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data}=await Axios.get(`/comments/${postId}/all`,config)
        
        dispatch({type:ALL_COMMENTS_SUCCESS,data:data.comments})

    } catch (error) {
        console.log(error);
        dispatch({type:ALL_COMMENTS_FAIL})
       
    }
}

