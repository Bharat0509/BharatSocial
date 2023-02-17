import * as AuthApi from '../Api/AuthRequest'
export const logIn=(formData)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.logIn(formData);
        console.log(data);
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log(error);
        dispatch({type:"AUTH_FAIL",err:error.response.data})
    }
   
}


export const signUp=(formData)=>async(dispatch)=>{
    dispatch({type:"AUTH_START"})
    try {
        const {data}=await AuthApi.signUp(formData);
        dispatch({type:"AUTH_SUCCESS",data:data})
    } catch (error) {
        console.log("error ",error);
        dispatch({type:"AUTH_FAIL",err:error.response.data})
    }
   
}