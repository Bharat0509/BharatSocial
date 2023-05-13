import './profile.scss'
import { FaFacebook, FaLinkedinIn, FaInstagram, FaPinterestSquare, FaTwitter } from 'react-icons/fa'
import { MdLocationPin, MdVerifiedUser } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { clearErrors, followUser, getPostData, getUserData, unfollowUser } from '../Actions/UserAction'
import PostSkeleton from '../components/Skeltons/PostSkeleton'
import { FOLLOW_USER_RESET } from '../Constants/userConstant'
import { CardMedia, Skeleton, Typography } from '@mui/material'
import { clearErrors as authClearError } from '../Actions/AuthAction'
import { DELETE_POST_RESET } from '../Constants/postConstans'

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user, isFollowed, error: authError } = useSelector(state => state.authReducers)
  const { profile: currentUser, loading: userLoading, error } = useSelector(state => state.profileReducer)
  const { posts, loading: postsLoading, commentError, isCommented } = useSelector(state => state.postsReducer)
  const { isDeleted } = useSelector(state => state.postReducer)


  const followSubmitHandler = (userId) => {

    if (currentUser.followers.includes(user._id)) {

      dispatch(unfollowUser(userId));
    }
    else {
      dispatch(followUser(userId));
    }
  }


  useEffect(() => {



    dispatch(getUserData(params.id));
    dispatch(getPostData(params.id));


    if (error) {
      toast(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast("Post Deleted Successfully")
      dispatch(getPostData(params.id));
      dispatch({ type: DELETE_POST_RESET })

    }
    if (isFollowed) {
      toast("User Followed !!", { type: 'success' })
      dispatch({ type: FOLLOW_USER_RESET })
    }
    if (authError) {
      toast(authError, { type: 'info' })
      dispatch(authClearError())
    }


  }, [params.id, error, isDeleted, isFollowed, authError, dispatch])



  return (
    <>{

      <div className="profile">

        <div className="img">
          {/* <div>
            <img className='bannerIMG' src={currentUser?.coverPicture} alt="" onClick={editCoverPic} onMouseEnter={e => setShowOption(true)} onMouseLeave={e => setShowOption(false)} />
            <span className='editOption'>
              {showOption && <EditIcon />}
            </span>
          </div> */}
          {(!currentUser || currentUser.coverPicture === undefined) ? (
            <Skeleton sx={{ height: '25vmax' }} animation="wave" variant="rectangular" />
          ) : (
            <CardMedia
              className='bannerIMG'
              component="img"
              height="25vmax"
              image={currentUser?.coverPicture}
              alt="Coveer Picture Loading ..."
            />
          )}
          <div>

            {(!currentUser || currentUser.profilePicture === undefined) ? (
              <Skeleton className='profileIMG' sx={{ height: '25vmax' }} animation="wave" variant="rectangular" />
            ) : (
              <CardMedia
                className='profileIMG'
                component="img"
                image={currentUser?.profilePicture}
                alt="Coveer Picture Loading ..."
              />
            )}

          </div>
        </div>
        {(userLoading || currentUser.followings === undefined) ? (
          <Skeleton className="userDetails" sx={{ height: '20vmax', zIndex: -1, backgroundColor: 'darkgrey' }} animation="wave" variant="rectangular" />
        ) :

          <>
            <div className="userDetails">
              <span className="userName">
                {/* {(currentUser?.name)}
            <h6>{`@${currentUser.username}`}</h6> */}
                <Typography component="h2" variant={'h2'} width={'100%'} margin={0} padding={0} lineHeight={1}>
                  {(!currentUser || !currentUser.name) ? <Skeleton width={'10vmax'} /> : currentUser.name}
                </Typography>
                <Typography component="h5" variant={'h5'} width={'100%'} margin={0} padding={0} >
                  {(!currentUser || !currentUser.name) ? <Skeleton width={'20vmax'} /> : `@${currentUser.username}`}
                </Typography>
              </span>
              <div className="options">
                {/* <div className="socialMedia">
                  <FaFacebook />
                  <FaLinkedinIn />
                  <FaInstagram />
                  <FaPinterestSquare />
                  <FaTwitter />

                </div> */}
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
                <div className="followings">Following : <span>{currentUser ? currentUser.followings?.length : 0}</span></div>

              </div>
              {user._id !== currentUser._id &&
                <div className="followUser button" onClick={() => followSubmitHandler(currentUser._id)}>
                  {
                    user && currentUser.followers.includes(user._id) ?
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
            </div></>
        }


      </div>}
    </>
  )
}

export default Profile