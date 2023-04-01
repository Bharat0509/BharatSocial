import './post.scss'
import { AiOutlineLike } from 'react-icons/ai';
import { MdModeComment, MdOutlineShare } from 'react-icons/md';
import { FcLike } from 'react-icons/fc'
import { useEffect, useState } from 'react';
import Comments from './Comments';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getTimeLinePosts } from '../../Actions/PostAction'

const Post = ({ data }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authReducers);
    const { post, isDeleted } = useSelector(state => state.postReducer);
    const liked = true;
    const likes = 344;
    const [showOption, setShowOption] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const toggle = () => {
        setShowComment(!showComment);
    }
    const toggleOption = () => {
        setShowOption(!showOption);
    }
    const deletePostHandler = (postId) => {
        dispatch(deletePost(postId));
    }
    const likePost = () => {
        setShowOption(!showOption);
    }
    const dislikePost = () => {
        setShowOption(!showOption);
    }

    useEffect(() => {
        if (!post) {
            dispatch(getTimeLinePosts(user._id));
        }
    }, [post])

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
                            <div onClick={() => deletePostHandler(data._id)}>Delete Post</div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <p>{data.description}</p>


                    {
                        data && data.postImage && data.postImage.url &&
                        <img src={data.postImage.url} />
                    }

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