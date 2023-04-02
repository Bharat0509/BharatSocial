import './navbar.scss'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { MdGridView, MdOutlineSearch, MdPersonOutline, MdOutlineEmail, MdNotificationsNone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Search from '../SearchBar/Search'
import { toast } from 'react-toastify'
import { clearErrors } from '../../Actions/AuthAction'
const Navbar = () => {

  const dispatch = useDispatch();
  const { user, loading, error, message } = useSelector(state => state.authReducers)
  const [showMore, setShowMore] = useState(false);
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  useEffect(() => {
    if (error) {
      toast(message);
      dispatch(clearErrors());
    }
  }, [dispatch, loading, error, message])
  return (
    <div className="navbar">
      <div className="left">
        <h1>BharatSocial</h1>

        <div className='navIcons '>
          <Link to='/'><HomeRoundedIcon /></Link>
          <Link to='/home'>
            <DarkModeIcon /></Link>
          <span className='m-navbar' title='Setting'>
            <MdGridView />
          </span>
        </div>

        <div className="search">
          <MdOutlineSearch />
          <input type="text" placeholder='Search...' />
          {/* <Search /> */}
        </div>
      </div>
      <div className="right">
        <div className="navIcons">
          <MdPersonOutline />
          <MdOutlineEmail />
          <MdNotificationsNone /></div>
        <div className="user">
          <Link to={`/profile/${user._id}`}>
            <img src={user?.profilePicture} alt="img" onClick={() => setShowMore(prev => !prev)} />
          </Link>
          {/* <span>{user?.username}</span> */}
          {showMore &&
            <>
              <div className='logout' onClick={() => logout()}>Logout</div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar