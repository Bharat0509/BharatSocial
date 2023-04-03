import { ALL_COMMENTS_FAIL, ALL_COMMENTS_REQUEST, ALL_COMMENTS_RESET, ALL_COMMENTS_SUCCESS, CREATE_COMMENTS_FAIL, CREATE_COMMENTS_REQUEST, CREATE_COMMENTS_SUCCESS } from "../Constants/commentConstant";
import { ALL_POSTS_FAIL, ALL_POSTS_REQUEST, ALL_POSTS_SUCCESS, CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_RESET, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_RESET, DELETE_POST_SUCCESS, DISLIKE_POST_FAIL, DISLIKE_POST_REQUEST, DISLIKE_POST_RESET, DISLIKE_POST_SUCCESS, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_RESET, LIKE_POST_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_RESET, UPDATE_POST_SUCCESS, USER_POSTS_FAIL, USER_POSTS_REQUEST, USER_POSTS_SUCCESS } from "../Constants/postConstans";

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



export const postReducer=(state={post:{},comments:{}},action)=>{
    switch(action.type){
        case DELETE_POST_REQUEST:
        case UPDATE_POST_REQUEST:
        case CREATE_COMMENTS_REQUEST:
        case ALL_COMMENTS_REQUEST:
            
       
            return {
                ...state,
                loading:true,
                
            }
        case LIKE_POST_REQUEST:
        case DISLIKE_POST_REQUEST:
            return {
                ...state,
                likeDislikeLoading:true,
                
            }
        case LIKE_POST_SUCCESS:
        case DISLIKE_POST_SUCCESS:
            return {
                ...state,
                likeDislikeLoading:false
                
            }
        case LIKE_POST_FAIL:
        case DISLIKE_POST_FAIL:
            return {
                ...state,
                likeDislikeLoading:false,
                likeDislikeError:true
                
            }
        case LIKE_POST_RESET:
        case DISLIKE_POST_RESET:
            return {
                ...state,
                likeDislikeLoading:false,
                likeDislikeError:false
                
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
         case ALL_COMMENTS_FAIL:
            return {
                ...state,
                createLoading:false,
                isCreated:false,
                loading:false,
                error:true
                
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
            case ALL_COMMENTS_RESET:
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
        case CREATE_COMMENTS_SUCCESS:
            return {
                ...state,
                loading:false,
                isCommented:true
            }
        case CREATE_COMMENTS_FAIL:
            return {
                ...state,
                loading:false,
                commentError:action.data,
                isCommented:false
            }
        case ALL_COMMENTS_SUCCESS:  
             return {
                ...state,
                loading:false,
                comments:action.data
            }
        
    
        default:
            return state;
    }
}
