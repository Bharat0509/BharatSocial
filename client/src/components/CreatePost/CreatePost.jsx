import './createPost.scss'
import { Link } from 'react-router-dom'
import { BsFillImageFill, BsFillCameraReelsFill, BsCalendarPlus } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { BiLocationPlus } from 'react-icons/bi'
import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SharePost } from '../../Actions/UploadAction'
import axios from 'axios'

const CreatePost = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducers.authData)
    const { loading } = useSelector(state => state.postReducer)
    const descRef = useRef();
    const [image, setImage] = useState(null);

    const imageRef = useRef();
    const clearForm = () => {
        if (descRef.current) {
            descRef.current.value = "";
        }
        setImage(null);
    }
    const onImgChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let image = e.target.files[0];
            setImage(image)
        }
    }
    const handleShare = async () => {
        dispatch({ type: 'UPLOAD_START' })
        const id = userData.user._id;
        const userName = userData.user?.username;
        const desc = descRef.current?.value;
        let imageUrl = null;
        let hasImage = false;

        if (image) {
            const Imgdata = new FormData();
            const filename = Date.now() + image.name;
            Imgdata.append("name", filename);
            Imgdata.append("file", image);
            Imgdata.append("upload_preset", "mq38lllh");
            imageUrl = await axios.post("https://api.cloudinary.com/v1_1/dbhf7xh4q/upload", Imgdata).then(res => {
                console.log(res.data);; res = res.data.url;
            });
            hasImage = true;

        }

        const url = imageUrl;
        if (hasImage) {
            const newPost = {
                userId: id,
                userName: userName,
                desc: desc,
                image: imageUrl
            };
            console.log(newPost);
            dispatch(SharePost({ newPost, clearForm }));
        }
        else {
            const newPost = {
                userId: id,
                userName: userName,
                desc: desc
            };
            console.log(newPost);
            dispatch(SharePost({ newPost, clearForm }));
        }
    }
    return (
        <div className="container">
            <div className="upperDiv">
                <div className="userPhoto">
                    <Link to='/profile/johndoe'>
                        <img src={userData.user?.profilePicture} alt="" />
                    </Link>
                </div>
                <div className="input"  >
                    <input type="text" name="" id="" placeholder="What' s Happening" required ref={descRef} />
                </div>

            </div>
            <div className="lowerDiv">
                <div className="options">
                    <div className="option">

                        <label onClick={() => imageRef.current.click()}>
                            <span><BsFillImageFill /></span>
                            <span >Photos</span>
                        </label>
                    </div>
                    <div className="option" onClick={() => imageRef.current.click()}>
                        <span><BsFillCameraReelsFill /></span>
                        <span>Videos</span>
                    </div>
                    <div className="option">
                        <span><BiLocationPlus /></span>
                        <span>Location</span>
                    </div>
                    <div className="option">
                        <span><BsCalendarPlus /></span>
                        <span>Shceduled</span>
                    </div>
                    <button className="option share-btn" onClick={handleShare} disabled={loading} >
                        {loading ? "Please Wait..." : "Share"}
                    </button>
                </div>
                <div>
                    <input type="file" hidden ref={imageRef} onChange={onImgChange} />
                </div>
            </div>
            {image && <div className="preview">
                <span className='cancle'><FaTimes onClick={() => setImage(null)} /></span>

                <img src={URL.createObjectURL(image)} alt="" />
            </div>
            }
        </div>
    )
}

export default CreatePost