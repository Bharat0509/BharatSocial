import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS, LOGOUT } from "../Constants/authConstant";
import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from "../Constants/userConstant";

const authReducer = (state = {user:null,loading:false,isAuthenticated:false,error:null} ,action) => {

 switch(action.type){
    case LOGOUT:
        return {
            user:null,
            loading:false,
            isAuthenticated:false,
           
        };
    case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        return {
            ...state,
            isAuthenticated:false,
            loading:true,
            
        }
        
    case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        
        return {
            ...state,
            user:action.data.user,
            loading:false,
            isAuthenticated:true,
            }
    
    case LOGIN_FAIL:
        case LOAD_USER_FAIL:
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            loading:false,
            error:action.data.error
        }
    case LOGIN_RESET:{
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            loading:false,
            error:null
        }
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