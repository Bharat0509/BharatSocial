import { useSelector } from 'react-redux'
import './leftbat.scss'

const Leftbar = () => {
  const userData = useSelector(state => state.authReducers.authData)
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={userData.user?.profilePicture || ''} alt="" />
            <span>{userData.user?.username || ''}</span>
          </div>
          <div className="items">
            <img src="2.png" alt="" />
            <span>Friends</span>
          </div>
          <div className="items">
            <img src="3.png" alt="" />
            <span>Groups</span>
          </div>
          <div className="items">
            <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-shopping-cart-shopping-cart.png" alt="" />
            <span>MarketPlace</span>
          </div>

          <div className="items">
            <img src="https://static.thenounproject.com/png/1523358-200.png" alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />

        <div className="menu">
          <div className="user">
            <img src="6.png" alt="" />
            <span>Events</span>
          </div>
          <div className="items">
            <img src="7.png" alt="" />
            <span>Gaming</span>
          </div>
          <div className="items">
            <img src="8.png" alt="" />
            <span>Gallery</span>
          </div>

          <div className="items">
            <img src="9.png" alt="" />
            <span>Videos</span>
          </div>
          <div className="items">
            <img src="10.png" alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <div className="user">
            <img src="11.png" alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="items">
            <img src="12.png" alt="" />
            <span>Tutorials</span>
          </div>
          <div className="items">
            <img src="13.png" alt="" />
            <span>Courses</span>
          </div>

        </div>


      </div>
    </div>
  )
}

export default Leftbar