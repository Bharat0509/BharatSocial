import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_RESET, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_RESET, DELETE_POST_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_RESET, UPDATE_POST_SUCCESS, USER_POSTS_FAIL, USER_POSTS_REQUEST, USER_POSTS_SUCCESS } from "../Constants/postConstans";

export const postsReducer=(state={posts:[],loading:false,error:null},action)=>{
    switch(action.type){
        case ALL_POSTS_REQUEST:
            case USER_POSTS_REQUEST:
            return {
                ...state,
                posts:[],
                loading:true,
                
            }
        case ALL_POSTS_SUCCESS:
           case USER_POSTS_SUCCESS:
            return {
                ...state,
                posts:action.data,
                loading:false,
                
            }
        case ALL_POSTS_FAIL:
            case USER_POSTS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }


        
    
        default:
            return state;
    }
}



export const postReducer=(state={post:{}},action)=>{
    switch(action.type){
        case DELETE_POST_REQUEST:
        case UPDATE_POST_REQUEST:
       
            return {
                ...state,
                loading:true,
                
            }
        case CREATE_POST_REQUEST:
            return {
                ...state,
                createLoading:true,
                
            }
       
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:true
                
            }
        
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                loading:false,
                post:action.data,
                isUpdated:true
                
        }
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                createLoading:false,
                isCreated:action.data
                
            }
         case CREATE_POST_FAIL:
            return {
                ...state,
                createLoading:false,
                isCreated:false,
                error:action.error
                
            }
        case DELETE_POST_FAIL:
            return {
                ...state,
                loading:false,
                isDeleted:false,
                error:action.error
            }
         case DELETE_POST_RESET:
            return {
                ...state,
                loading:false,
                isDeleted:false,
                error:null
            }
        case CREATE_POST_RESET:
            return {
               ...state,
                createLoading:null,
                isCreated:false,
                error:null
            }
        case UPDATE_POST_RESET:
            return {
                ...state,
                loading:false,
                isUpdated:false,
                error:null
            }

        
    
        default:
            return state;
    }
}
