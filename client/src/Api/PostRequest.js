import axios from 'axios'
const API = axios.create({baseURL: 'https://bharatsocial-infc.onrender.com'})

export const getTimeLinePosts = async (id) => {

    return await  API.get(`/post/${id}/timeline`);
    
    
}
