import './navbar.scss'
import { TiHomeOutline } from 'react-icons/ti'
import { HiOutlineMoon } from 'react-icons/hi'
import { MdGridView, MdOutlineSearch, MdPersonOutline, MdOutlineEmail, MdNotificationsNone } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
const Navbar = () => {
  
  const dispatch=useDispatch();
  const userData = useSelector(state => state.authReducers.authData)
  const [showMore, setShowMore] = useState(false);
  const logout = () => {
    dispatch({type:'LOGOUT'})
    localStorage.clear(); 
  }
  return (
    <div className="navbar">
      <div className="left">
        <h1>BharatSocial</h1>

        <div className='navIcons '>
          <Link to='/'><TiHomeOutline /></Link>
          <Link to='/home'>
            <HiOutlineMoon /></Link>
          <Link to='/more'>
            <MdGridView />
          </Link>
        </div>

        <div className="search">
          <MdOutlineSearch />
          <input type="text" placeholder='Search...' />
        </div>
      </div>
      <div className="right">
        <div className="navIcons">
          <MdPersonOutline />
          <MdOutlineEmail />
          <MdNotificationsNone /></div>
        <div className="user">
          <img src={userData.user?.profilePicture} alt="img" onClick={() => setShowMore(prev => !prev)} />
          <span>{userData.user?.username}</span>
          <div className='logout' onClick={()=>logout()}>Logout</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar