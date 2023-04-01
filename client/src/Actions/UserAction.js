
import Axios from '../Axios.js'
import { USER_POSTS_FAIL, USER_POSTS_REQUEST, USER_POSTS_SUCCESS } from '../Constants/postConstans.js';
import { CLEAR_ERRORS, GET_USER_FAIL, GET_USER_POST_FAIL, GET_USER_POST_REQUEST, GET_USER_POST_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from '../Constants/userConstant.js';

//Load user
export const loadUser=()=>async(dispatch)=>{
    dispatch({type:LOAD_USER_REQUEST})
    try {
        const {data}=await Axios.get('/users/me')
        dispatch({type:LOAD_USER_SUCCESS,data:data.user})
        
    } catch (error) {
        
        dispatch({type:LOAD_USER_FAIL,data:error?.response?.data?.message})
        
    }
   
}

//Get user details
export const getUserData = (userId)=>async (dispatch) => {
    dispatch({type:GET_USER_REQUEST})

    try {
        const {data}=await Axios.get(`/users/${userId}`)
        dispatch({type:GET_USER_SUCCESS,data:data.user})

    } catch (error) {
        
        dispatch({type:GET_USER_FAIL,data:error?.response?.data?.message})
        
    }
    
}


//Get user Post Details 
export const getPostData =  (userId)=>async (dispatch) => {
    dispatch({type:USER_POSTS_REQUEST})

    try{
        const {data} = await Axios.get(`/users/${userId}/posts`)
        dispatch({type:USER_POSTS_SUCCESS,data:data.posts})
    }
    catch(error){
        dispatch({type:USER_POSTS_FAIL,data:error})
    }


  }


  export const clearErrors=()=>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
  }