
const postReducer=(state={posts:null,loading:false,error:false},action)=>{
    switch(action.type){
        case "RETREIVING_START":
            return {...state,loading:true,error:false}
        case "RETREIVING_SUCCESS":
           console.log('retrive success');
            return {...state,posts:action.data,loading:false,error:false}
        case "RETREIVING_FAIL":
            return {...state,loading:false,error:true}


        case "UPLOAD_START":
            return {...state,loading:true,error:false}
        case "UPLOAD_SUCCESS":
            console.log(action.data);
            return {...state,posts:[action.data,...state.posts],loading:false,error:false}
        case "UPLOAD_FAIL":
            return {...state,loading:false,error:true}
        case "LOADING_START":
            return {...state,loading:true,error:false}
        case "LOADING_SUCCESS":
            return {...state,loading:false,error:false}
        case "DELETE_START":
            return {...state,loading:true,error:false}
        case "DELETE_SUCCESS":
            return { ...state,posts:[action.data],loading:false,error:false}
        
        default:
            return state;
    }
}
export default postReducer