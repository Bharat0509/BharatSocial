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
        <span>Sponsered By</span>
        <div className="sponsoredContainer">
          <img src="https://imgs.search.brave.com/GotiXqw39wNWCs70kOkS_oLVHNAIRcy1SBtesahNvds/rs:fit:1200:891:1/g:ce/aHR0cHM6Ly9hbm90/aGVyY2hpbGRmb3Vu/ZGF0aW9uLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxOC8x/MS9iZWNvbWVhc3Bv/bnNvci0wOC5wbmc" alt="" />
          <p>
            <Link>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, beatae?
              More...</Link>
          </p>
        </div>
      </div>



      <div className="online">
        <span> Friend Requests </span>

        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
            <span className='status'>
              <div className='accept'>ACCEPT</div>
              <div className='reject'>REJECT</div>
            </span>
          </div>
        </div>

        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
            <span className='status'>
              <div className='accept'>ACCEPT</div>
              <div className='reject'>REJECT</div>
            </span>
          </div>
        </div>

        <div className="user">
          <div className="detail">
            <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <span className="name">John Doe</span>
            <span className='status'>
              <div className='accept'>ACCEPT</div>
              <div className='reject'>REJECT</div>
            </span>
          </div>
        </div>




      </div>

    </div>
  )
}

export default Rightbar