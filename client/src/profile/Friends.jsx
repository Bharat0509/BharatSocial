import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar/Search';
import './Friends.scss'
import React, { useEffect } from 'react';

const Friends = () => {
    const [checked, setChecked] = React.useState([1]);
    const { users, loading } = useSelector(state => state.usersReducer)
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    useEffect(() => {

    }, [users, loading])
    return (
        <div className="friends">
            <div className='searchUsers'>

                <p>Search New Friends Across Whole Globe !!</p>
                <SearchBar />
            </div>

            <div className="following-request">

                <span> Following Requests </span>

                <div className="user">
                    <div className="detail">
                        <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <span className="name">John Doe</span>

                    </div>
                    <span className='status'>
                        <div className='accept'>ACCEPT</div>
                        <div className='reject'>REJECT</div>
                    </span>
                </div>

                <div className="user">
                    <div className="detail">
                        <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <span className="name">John Doe</span>

                    </div>
                    <span className='status'>
                        <div className='accept'>ACCEPT</div>
                        <div className='reject'>REJECT</div>
                    </span>
                </div>

                <div className="user">
                    <div className="detail">
                        <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <span className="name">John Doe</span>

                    </div>
                    <span className='status'>
                        <div className='accept'>ACCEPT</div>
                        <div className='reject'>REJECT</div>
                    </span>
                </div>

            </div>


            <div className="following-request">

                <span> My Friends</span>
                <div className="user">
                    <div className="detail">
                        <img src="https://images.pexels.com/photos/534229/pexels-photo-534229.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                        <span className="name">John Doe</span>

                    </div>
                    <span className='status'>
                        <div className='accept'>VIEW PROFILE</div>
                        <div className='reject'>UNFOLLOW</div>
                    </span>
                </div>

            </div>
        </div>
    );
}

export default Friends