import axios from 'axios'
export const SharePost=({newPost,clearForm})=>async(dispatch)=>{   
       dispatch({type:"UPLOAD_START"})
       console.log("upload startere");

        try {
            const response=await axios.post('https://bharatsocial-infc.onrender.com/post/', newPost); 
            clearForm();
            console.log(response);
            dispatch({type:"UPLOAD_SUCCESS",data:response.data})
        } 
        catch (error) {
      dispatch({type:"UPLOAD_FAIL"});
            console.log(error);
            
        }  
}