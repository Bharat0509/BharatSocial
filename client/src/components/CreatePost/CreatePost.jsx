import './createPost.scss'
import { Link } from 'react-router-dom'
import { BsFillImageFill, BsFillCameraReelsFill, BsCalendarPlus } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { BiLocationPlus } from 'react-icons/bi'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getTimeLinePosts } from '../../Actions/PostAction'
import { toast } from 'react-toastify'
import { CREATE_POST_RESET } from '../../Constants/postConstans'


const CreatePost = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authReducers)
    const { createLoading, error, isCreated } = useSelector(state => state.postReducer)
    const [description, setDescription] = useState("")
    const [postImage, setPostImage] = useState(null);
    const [postImagePreview, setPostImagePreview] = useState(null);

    const imageRef = useRef();

    const createPostSubmitHandler = (e) => {
        e.preventDefault();
        const myForm =
        {
            "description": description,
            "postImage": postImage
        }

        dispatch(createPost(myForm))
    }

    const canclePreview = () => {
        setPostImagePreview(null);
        setPostImage(null);
        imageRef.current.value = null
    }

    const HandleShareDataChange = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPostImagePreview(reader.result);
                setPostImage(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    useEffect(() => {
        if (error) {
            toast(error, { type: 'error' });
        }
        if (isCreated) {
            setPostImage(null)
            setPostImagePreview(null)
            setDescription('')
        }


    }, [dispatch, postImagePreview, error, postImage, isCreated])

    return (
        <div className="container">
            <div className="upperDiv">
                <div className="userPhoto">
                    <Link to={`/profile/${user._id}`}>
                        <img src={user?.profilePicture} alt="" />
                    </Link>
                </div>
                <div className="input"  >
                    <textarea type="text" name="description" value={description} placeholder="What's In You Mind..." required onChange={e => setDescription(e.target.value)} />

                    {
                        postImagePreview &&
                        <div className="preview">
                            <span className='cancle'><FaTimes onClick={canclePreview} /></span>
                            <img src={postImagePreview} alt="" />
                        </div>
                    }

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
                    {/* <div className="option">
                        <span><BsCalendarPlus /></span>
                        <span>Shceduled</span>
                    </div> */}
                    <button className="option share-btn" onClick={createPostSubmitHandler} disabled={(description.length === 0 && !createLoading) ? true : false} >
                        {createLoading ? "Publishing..." : "Publish a Post"}
                    </button>
                </div>
                <div>
                    <input type="file" hidden ref={imageRef} onChange={HandleShareDataChange} />
                </div>
            </div>

        </div>
    )
}

export default CreatePost