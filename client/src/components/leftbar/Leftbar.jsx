import { useSelector } from 'react-redux'
import './leftbat.scss'
import { Link } from 'react-router-dom'
import ArticleIcon from '@mui/icons-material/Article';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Leftbar = () => {
  const { user } = useSelector(state => state.authReducers)
  return (
    <div className="leftbar">
      <div className="container">

        <div className="menu">
          <Link to={`/me/profile/${user._id}`}>
            <div className="user">
              <AccountCircleIcon />
              {/* <span>{user?.username || ''}</span> */}
              <span>My Account</span>
            </div>
          </Link>



          <Link to={'/me/friends'}>
            <div className="items">

              <PeopleIcon />
              <span>Friends</span>

            </div>
          </Link>

          <Link to={'/me/posts'}>
            <div className="items">

              <ArticleIcon />
              <span>Your Posts</span>

            </div>
          </Link>

          <Link to={'/explore'}>
            <div className="items">

              <TravelExploreIcon />
              <span>Explore</span>

            </div>
          </Link>

        </div>
        <hr />

        <div className="menu">
          <Link to={'/explore'}>
            <div className="user">

              <EventIcon />
              <span>Events</span>

            </div>
          </Link>

          <Link to={'/explore'}>
            <div className="items">

              <SportsEsportsIcon />
              <span>Gaming</span>

            </div>
          </Link>

          <Link to={'/explore'}>
            <div className="items">

              <BusinessCenterIcon />
              <span>Sponsors</span>

            </div>

          </Link>


          <Link to={'/explore'}>
            <div className="items">

              <MessageIcon />
              <span>Messages</span>

            </div></Link>
        </div>

      </div>
    </div>
  )
}

export default Leftbar