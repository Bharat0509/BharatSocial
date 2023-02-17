import axios from 'axios';

export const  followUser =async ({followUserId,followingUserId}) => {
    console.log("followe user");
    console.log(followUserId,followingUserId);
    await axios.post(`https://bharatsocial-infc.onrender.com/user/${followUserId}/follow`,{followingUserId}).then(()=>{

    })
}
// const handleUpdate = async ({userData,pfo
// }) => async (dispatch)=>{
//     dispatch({ type: 'UPDATE_START' })
//     const id = userData.user?._id;
//     const userName = userData.user?.username;
//     let imageUrl = null;
//     let hasImage = false;
//     try {
//         if (image) {
//             const Imgdata = new FormData();
//             const filename = Date.now() + image.name;
//             Imgdata.append("name", filename);
//             Imgdata.append("file", image);
//             Imgdata.append("upload_preset", "mq38lllh");
//             imageUrl = await axios.post("https://api.cloudinary.com/v1_1/dbhf7xh4q/upload", Imgdata).then(res => res.data.url);
//             hasImage = true;
    
//         }
//         const url = imageUrl;
//         if (hasImage) {
//             const newPost = {
//                 userId: id,
//                 userName: userName,
//                 desc: desc,
//                 image: imageUrl
//             };
//             console.log(newPost);
//             dispatch(SharePost({ newPost, clearForm }));
//         }
//         else {
//             const newPost = {
//                 userId: id,
//                 userName: userName,
//                 desc: desc
//             };
//             console.log(newPost);
//             dispatch(SharePost({ newPost, clearForm }));
//         }
//     } catch (error) {
//         dispatch({type:'UPLOAD_FAIL'});
//         console.log(error);
//     }
    

// }