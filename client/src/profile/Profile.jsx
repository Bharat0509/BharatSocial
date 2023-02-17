import './profile.scss'
import { FaFacebook, FaLinkedinIn, FaInstagram, FaPinterestSquare, FaTwitter } from 'react-icons/fa'
import { MdLocationPin, MdVerifiedUser, MdEmail } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import Post from '../components/chats/Post'
import { useDispatch, useSelector } from 'react-redux'
import { followUser } from './API/followUser'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const Profile = () => {
  const id = window.location.pathname.split('/')[2];
  const currentUser = useSelector(state => state.authReducers.authData.user)
  const [userData, setUserData] = useState();
  const [userPosts, setUserPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false)
  const [followings, setFollowings] = useState(0)

  const getUserData = async (id) => {
    const res = await axios.get(`https://bharatsocial-infc.onrender.com/user/${id}`).then(res => res.data);
    setUserData(res);
    console.log(currentUser._id, res);
    const status = userData.followers.includes(currentUser._id);
    setFollowing(status);
    setFollowings(userData.followings.length)
  }
  const getPostData = async (id) => {
    const res = await axios.get(`https://bharatsocial-infc.onrender.com/user/posts/${id}`).then(res => res.data);
    setUserPosts(res);


  }
  function capitalize(input) {
    var words = input?.split(' ');
    var CapitalizedWords = [];
    words?.forEach(element => {
      CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
  }
  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    getUserData(id);
    getPostData(id);


  }, [id])

  const editProfilePic = () => {

  }

  const editCoverPic = () => {
  }


  return (
    <>{
      !loading
      &&
      <div className="profile">

        <div className="img">
          <img className='bannerIMG' src={userData?.coverPicture} alt="" onClick={editCoverPic} />
          <img src={userData?.profilePicture} alt="" className="profileIMG" onClick={editProfilePic} />
        </div>

        <div className="userDetails">
          <span className="userName">
            {capitalize(userData?.username)}
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
                <span>{capitalize(userData?.username)}</span>
              </div>
            </div>
            <div className="contact">
              <MdEmail />
              <BsThreeDots />
            </div>
          </div>
          <div className="uStatus">
            <div className="followers"><span>Followers : </span>{userData?.followers.length}</div>
            <div className="followings"><span>Followings : </span>{followings}</div>
            <div className="followUser button" onClick={() => followUser(id, currentUser._id, setFollowings, setFollowing)}>{following ? "Following" : "Follow"}</div>
          </div>

        </div>
        <div className="posts">
          {!loading &&
            userPosts?.map((post) => {
              return (<Post key={post._id} data={post} />)
            })
          }
        </div>
      </div>}
    </>
  )
}

export default Profile