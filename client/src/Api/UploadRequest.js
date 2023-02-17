import axios from "axios";
export const SharePost = async ({data}) => {
    console.log(data);
    await axios.post('https://bharatsocial-infc.onrender.com/post/',data);
    console.log("NO IMG");
}
