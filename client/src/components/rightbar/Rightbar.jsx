import './rightbar.scss'
import { Link } from 'react-router-dom'

const Rightbar = () => {

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
        <span> Following Requests </span>

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