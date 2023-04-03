import * as React from 'react';
import './Search.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, loadUser } from '../../Actions/UserAction'
import { MdOutlineSearch } from 'react-icons/md';
let options = [''];

export default function ControllableStates() {

    const dispatch = useDispatch();
    const [value, setValue] = React.useState("");
    const { users, loading } = useSelector(state => state.usersReducer)
    const [inputValue, setInputValue] = React.useState('');
    const [showUsers, setShowUsers] = React.useState(true)

    const handleClose = () => {
        setTimeout(() => {
            setShowUsers(false)
        }, 500);
    }

    const getData = () => {
        dispatch(getUsers(inputValue))
        setShowUsers(true);
        options = users;
        console.log("options --> ", options);
    }
    React.useEffect(() => {
        if (inputValue.length) {
            const timer = setTimeout(() => {

                getData();
            }, 500)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [inputValue])


    return (

        <div className="search-container">

            <div className="searchBar">
                <MdOutlineSearch />
                <input type="text" placeholder='Search Name...' onChange={e => setInputValue(e.target.value)} onFocus={e => setShowUsers(true)} onBlur={handleClose} />

            </div>
            <div className="results-container">
                {
                    inputValue.length > 0 && showUsers && users && users.length > 0 &&
                    users.map(user =>
                        <div>
                            <Link to={`/profile/${user._id}`}>
                                <h5>{user.name}</h5>
                                <h6>@{user.username}</h6>

                            </Link>
                        </div>

                    )
                }
            </div>
        </div>

    );
}