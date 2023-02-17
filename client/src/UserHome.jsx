import Navbar from './components/navbar/Navbar'
import Leftbar from './components/leftbar/Leftbar'
import Rightbar from './components/rightbar/Rightbar'
import Post from './components/chats/Post'
import './App.css'

const UserHome = ({ Children }) => {
    return (
        <div className='main'>
            <div className='nav'>
                <Navbar />
            </div>
            <div className='sub-main'>
                <div className='left'>
                    <Leftbar />
                </div>
                <div className='middle'>
                    <Children />
                </div>
                <div className='right'>
                    <Rightbar />
                </div>
            </div>
        </div>
    )
}

export default UserHome