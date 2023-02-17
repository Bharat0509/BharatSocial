import axios from "axios";

export const PostsData= async ({id})=>{
    return await axios.get(`https://bharatsocial-infc.onrender.com/post/${id}/timeline`);
}