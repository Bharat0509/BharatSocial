import { GET_USER_REQUEST, GET_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_RESET, LOAD_USER_SUCCESS } from "../Constants/userConstant";

const authReducer = (state = {profile:{}} ,action) => {

 switch(action.type){
    case LOAD_USER_REQUEST:
    case GET_USER_REQUEST:
        return {
            profile:{},
            loading:false,
            isAuthenticated:false,
            
        };
    case LOAD_USER_SUCCESS:
        return {
            ...state,
            profile:action.data,
            isAuthenticated:true,
            loading:true,
            
        }
    case GET_USER_SUCCESS:
        return {
            ...state,
            profile:action.data,
            loading:false,
            
        }
    
    
    case LOAD_USER_FAIL:
        
        return {
            ...state,
            profile:{},
            loading:false,
            error:action.error,

            
        }
    case LOAD_USER_RESET:
        return{
            ...state,
            profile:{},
            loading:false,
            
            isAuthenticated:true,
            error:action.error
        }
   

    case "CLEAR_ERRORS":
        return {
            ...state,
            user:null,
            loading:false,
            error:null
        }
    
    default:
        return state;
 }  
}

export default authReducer;