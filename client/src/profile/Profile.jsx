import './profile.scss'
import { FaFacebook, FaLinkedinIn, FaInstagram, FaPinterestSquare, FaTwitter } from 'react-icons/fa'
import { MdLocationPin, MdVerifiedUser, MdEmail } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import Post from '../components/chats/Post'
import { useDispatch, useSelector } from 'react-redux'

import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { followUser, getPostData, getUserData } from '../Actions/UserAction'
import PostSkeleton from '../components/Skeltons/PostSkeleton'
import { FOLLOW_USER_RESET } from '../Constants/userConstant'

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user, isFollowed } = useSelector(state => state.authReducers)
  const { profile: currentUser, loading: userLoading, error } = useSelector(state => state.profileReducer)
  const { posts, loading: postsLoading, error: postsError } = useSelector(state => state.postsReducer)
  const { isDeleted } = useSelector(state => state.postReducer)

  const [showOption, setShowOption] = useState(false)

  useEffect(() => {


    if (currentUser._id != params.id) {
      dispatch(getUserData(params.id));
      dispatch(getPostData(params.id));
    }
    else {
      dispatch(getPostData(params.id));
    }

    if (error) {
      toast(error);
    }
    if (isDeleted) {
      toast("Post Deleted Successfully")
      dispatch(getPostData(params.id));

    }
    if (isFollowed) {
      toast("User Followed !!", { type: 'success' })
      dispatch(getUserData(params.id));
      dispatch({ type: FOLLOW_USER_RESET })
    }

  }, [params.id, error, isDeleted])

  const editProfilePic = () => {

  }

  const editCoverPic = () => {
  }
  const followSubmitHandler = (userId) => {
    dispatch(followUser(userId));
  }


  return (
    <>{
      !userLoading
      &&
      <div className="profile">

        <div className="img">
          <div>
            <img className='bannerIMG' src={currentUser?.coverPicture} alt="" onClick={editCoverPic} onMouseEnter={e => setShowOption(true)} onMouseLeave={e => setShowOption(false)} />
            <span className='editOption'>
              {showOption && <EditIcon />}
            </span>
          </div>
          <div>
            <img src={currentUser?.profilePicture} alt="" className="profileIMG" onClick={editProfilePic} />
          </div>
        </div>

        <div className="userDetails">
          <span className="userName">
            {(currentUser?.name)}
            <h6>@{currentUser.username}</h6>
          </span>
          <div className="options">
            <div className="socialMedia">
              <FaFacebook />
              <FaLinkedinIn />
              <FaInstagram />
              <FaPinterestSquare />
              <FaTwitter />

            </div>
            <div className="detail">
              <div className="location">
                <MdLocationPin />
                <span>INDIA</span>
              </div>
              <div className="name">
                <MdVerifiedUser />
                <span>{(currentUser?.username)}</span>
              </div>
              <div >
                <BsThreeDots />
              </div>
            </div>

          </div>
          <div className="uStatus">
            <div className="followers">Followers : <span>{currentUser ? currentUser.followers?.length : 0}</span></div>
            <div className="vertLine"></div>
            <div className="followings">Followings : <span>{currentUser ? currentUser.followings?.length : 0}</span></div>

          </div>
          {user._id !== currentUser._id &&
            <div className="followUser button" onClick={e => followSubmitHandler(user._id)}>
              {
                user && user.followings.includes(currentUser._id) ?
                  "Unfollow"
                  :
                  "Follow"

              }
            </div>
          }

        </div>
        <div className="posts">
          {!postsLoading ?
            posts?.map((post) => {
              return (<PostSkeleton key={post._id} data={post} />)
            })
            :
            <>
              <PostSkeleton loading={true} />
              <PostSkeleton loading={true} />
            </>
          }
        </div>
      </div>}
    </>
  )
}

export default Profile