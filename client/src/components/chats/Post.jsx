import './post.scss'
import { AiOutlineLike } from 'react-icons/ai';
import { MdModeComment, MdOutlineShare } from 'react-icons/md';
import { FcLike } from 'react-icons/fc'
import { useEffect, useState } from 'react';
import Comments from './Comments';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getTimeLinePosts } from '../../Api/PostRequest';



const Post = ({ data }) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducers.authData);
  const postData = useSelector(state => state.postReducer.posts);
  const [liked, setLiked] = useState(data.likes?.includes(userData.user?._id));
  const [likes, setLikes] = useState(data.likes?.length);
  const [showOption, setShowOption] = useState(false);
  const likePost = async () => {
    try {
      const res = await axios.put(`https://bharatsocial-infc.onrender.com/post/${data._id}/like`, { userId: userData.user._id });
      setLikes(prev => prev + 1);
      setLiked(true);
    } catch (error) {
      console.log(error);
    }
  }
  const dislikePost = async () => {
    try {
      const res = await axios.put(`https://bharatsocial-infc.onrender.com/post/${data._id}/dislike`, { userId: userData.user._id });
      setLikes(prev => prev - 1);
      setLiked(false);
    } catch (error) {
      console.log(error);
    }
  }
  const deletePost = async (id) => {
    dispatch({ type: "DELETE_START" })
    try {
      const res = await axios.delete(`https://bharatsocial-infc.onrender.com/post/${id}`, { data: { userId: userData.user._id } }).then(() => {
        dispatch({ type: "DELETE_SUCCESS", data: postData.filter(post=>(post._id!==id)) })
        
        console.log(postData.filter(post=>(post._id!==id)))
        // alert("Post Deleted Succesfully!!")
      });

    } catch (error) {
      console.log(error);
    }
  }

  const [showComment, setShowComment] = useState(false);
  function toggle() {
    setShowComment(!showComment);
  }
  function toggleOption() {
    setShowOption(!showOption);
  }
  useEffect(() => {
    getTimeLinePosts(userData.user._id);
  }, [postData])

  return (
    <div className='posts'>
      <div className="post">
        <div className="container">
          <div className="left">

            <div className="userPhoto">
              <Link to={`/profile/${data.userId}`}>
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
              </Link>
            </div>
            <div className="userDetail">
              <span className='userName'>{data.userName}</span>
              <span className='userVisited'>{data?.createdAt?.slice(0, 10)}</span>
            </div>
          </div>
          <div className="post-right"><span onClick={toggleOption}>...</span>
            <div className={showOption ? 'option ' : 'option hide'}>
              <div>Edit Post</div>
              <div onClick={() => deletePost(data?._id)}>Delete Post</div>
            </div>
          </div>
        </div>
        <div className="content">
          <p>{data.desc}</p>
          {data.image ? (data.image.indexOf('.mp4') == -1 ? <img src={data.image} alt="logo" /> : <iframe height='394' width='700' src={data.image} frameborder="0" allowfullscreen></iframe>) : ""}
          <div className="content-status">
            <div className="like">

              <span className="icon"> {liked ? <FcLike onClick={dislikePost} /> : <AiOutlineLike onClick={likePost} />}</span>
              <span>{likes}</span>

            </div>
            <div className="comments" onClick={toggle}>
              <span className="icon"> <MdModeComment /></span>
              <span>Comments</span>
            </div>
            <div className="share">
              <span className="icon"><MdOutlineShare /></span>
              <span>Share</span>
            </div>
          </div>
          <div className="comments">
            {
              showComment ? <Comments /> : <></>
            }
          </div>
        </div>
      </div>

    </div>

  )
}

export default Post