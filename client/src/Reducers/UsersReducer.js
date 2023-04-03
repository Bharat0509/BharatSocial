import { GET_USERS_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_RESET, LOAD_USER_SUCCESS } from "../Constants/userConstant";

export const usersReducer = (state = {users:[]} ,action) => {

 switch(action.type){
    
    case GET_USERS_REQUEST:
        return {
            users:{},
            loading:true,
            
        };
  
    case GET_USERS_SUCCESS:
        return {
            ...state,
            users:action.data,
            loading:false,

            
        }
    
    
    case GET_USERS_FAIL:
        return{
            ...state,
            users:[],
            error:action.data


        }


    case "CLEAR_ERRORS":
        return {
            ...state,
            users:null,
            loading:false,
            error:null
        }
    
    default:
        return state;
 }  
}

