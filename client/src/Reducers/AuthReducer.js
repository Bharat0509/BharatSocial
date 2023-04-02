import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_RESET, LOGIN_SUCCESS, LOGOUT } from "../Constants/authConstant";
import { FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_RESET, FOLLOW_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, UNFOLLOW_USERS_FAIL, UNFOLLOW_USERS_REQUEST, UNFOLLOW_USERS_RESET, UNFOLLOW_USERS_SUCCESS } from "../Constants/userConstant";

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

    case FOLLOW_USER_REQUEST:
        case UNFOLLOW_USERS_REQUEST:
            return {
            ...state,
            loading:true,
            
        }
    case FOLLOW_USER_SUCCESS:
            return {
            ...state,
            
            loading:false,
            isFollowed:action.data
            
        }
    case UNFOLLOW_USERS_SUCCESS:
            return {
            ...state,
            loading:false,
            isUnfollowed:action.data
            
        }
    case FOLLOW_USER_FAIL:
        
            return {
            ...state,
            
            loading:false,
            isFollowed:false,
            error:action.data
            
        }
    case UNFOLLOW_USERS_FAIL:
            return {
            ...state,
            loading:false,
            isUnfollowed:false,
            error:action.data
            
        }
    case FOLLOW_USER_RESET:
        case UNFOLLOW_USERS_RESET:
        return {
            ...state,
            loading:false,
            error:false

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
        
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            loading:false,
            error:action.data.error
        }
     case LOAD_USER_FAIL:
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            loading:false,
            
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