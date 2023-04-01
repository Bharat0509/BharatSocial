import { useState } from 'react'
import axios from 'axios'
import './rightbar.scss'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Rightbar = () => {
  const { user: currentUser } = useSelector(state => state.authReducers);
  const currentUserId = currentUser?._id;
  const { loading } = useSelector(state => state.postReducer);
  const [users, setUsers] = useState();
  const dispatch = useDispatch();
  const getUsers = async () => {
    return await axios.get(`https://bharatsocial-infc.onrender.com/user/6385b23b7a3656125ab456b5/users`).then(res => res.data).then(res => {
      setUsers(res);
      filterUser();
    });
  }
  const userFollow = async (followUserId, followingUserId) => {
    console.log(followUserId);
    const followingId = {
      "currentUserId": followingUserId
    }
    dispatch({ type: 'LOADING_START' })
    await axios.put(`https://bharatsocial-infc.onrender.com/user/${followUserId}/follow`, followingId).then(() => {
      dispatch({ type: 'LOADING_SUCCESS' })
    })
  }
  const filterUser = () => {
    users?.filter(user => {
      return user._id == currentUserId;
    })
    console.log(users);
  }

  useEffect(() => {
    console.log(currentUser);
    getUsers();


  }, [loading, currentUser, currentUserId])
  return (
    <div className="rightbar">
      <div className="suggestion">
        <span>Suggestion For You</span>
        {

          users?.map((user) => {
            return ((user._id != currentUserId) && !user.followers.includes(currentUserId) &&
              <div className="user" key={user._id}>
                <div className="detail">
                  <img src={user.profilePicture} alt={user.username} />
                  <Link to={`/profile/${user._id}`}><span className="name">{user.username}</span></Link>
                </div>
                <div className="action">
                  {console.log(user._id, currentUserId)}
                  <button onClick={() => userFollow(user._id, currentUserId)}>Follow</button>
                  <button>Dismiss</button>
                </div>

              </div>
            )
          })
        }
      </div>
      <div className="activity">
        <span>Latest Activities</span>

        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
          </div>
          <div className="action">
            <p>changed post details</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
          </div>
          <div className="action">
            <p>changed post details</p>
            <span>1 min ago</span>
          </div>
        </div>


        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
          </div>
          <div className="action">
            <p>changed post details</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
          </div>
          <div className="action">
            <p>changed post details</p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className="online">
        <span>Online Now</span>

        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
            <span className='status'></span>
          </div>
        </div>
        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
            <span className='status'></span>
          </div>
        </div>



      </div>

    </div>
  )
}

export default Rightbar