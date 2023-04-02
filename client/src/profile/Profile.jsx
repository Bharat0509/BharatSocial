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
import { getPostData, getUserData } from '../Actions/UserAction'
import PostSkeleton from '../components/Skeltons/PostSkeleton'

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducers)
  const { profile: currentUser, loading: userLoading, error } = useSelector(state => state.profileReducer)
  const { posts, loading: postsLoading, error: postsError } = useSelector(state => state.postsReducer)
  const { isDeleted } = useSelector(state => state.postReducer)

  const [showOption, setShowOption] = useState(false)

  function capitalize(input) {
    var words = input?.split(' ');
    var CapitalizedWords = [];
    words?.forEach(element => {
      CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
  }

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

  }, [params.id, error, isDeleted])

  const editProfilePic = () => {

  }

  const editCoverPic = () => {
  }
  const followSubmitHandler = () => {

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
            {capitalize(currentUser?.username)}
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
                <span>{capitalize(currentUser?.username)}</span>
              </div>
              <div >
                <BsThreeDots />
              </div>
            </div>

          </div>
          <div className="uStatus">
            <div className="followers">Followers : <span>{currentUser?.followers?.length}</span></div>
            <div className="vertLine"></div>
            <div className="followings">Followings : <span>{currentUser?.followings?.length}</span></div>

          </div>
          {user._id !== currentUser._id &&
            <div className="followUser button" onClick={followSubmitHandler}>Follow</div>
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