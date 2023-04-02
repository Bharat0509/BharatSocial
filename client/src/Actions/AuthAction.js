
import Axios from '../Axios.js'
import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from '../Constants/authConstant';




export const logIn=(formData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const config = {
            Headers: { 'content-type': 'application/json' }, 
        };
        const {data}=await Axios.post('/auth/login',formData,config)
        console.log("Login data ",data);
        dispatch({type:LOGIN_SUCCESS,data:data})

    } catch (error) {
        
        dispatch({type:LOGIN_FAIL,data:error.response.data})
        
    }
   
}


export const signUp=(formData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const config = { 
            withCredentials: true ,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("form data",formData);

        const {data}=await Axios.post('/auth/register',formData,config)
        dispatch({type:REGISTER_SUCCESS,data:data})

    } catch (error) {
        
        dispatch({type:REGISTER_FAIL,data:error?.response?.data?.message})
    }
   
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}