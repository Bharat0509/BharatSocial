import React from 'react'
import './UserDetails.scss'
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';

const UserDetails = () => {
    return (
        <>
            <div>
                <div className="detail-block-1">
                    <div className="detail-profilePic">
                        <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80" alt="Profile Picture" />
                    </div>
                    <div className="detail-username">Jack Dorsey</div>
                    <div className="detail-handles">
                        <div>@jackdorsey</div>
                        <div>|</div>
                        <div>dorsey.com</div>
                    </div>
                    <div className="detail-country">
                        United Arab  Emirates
                    </div>
                </div>
                <div className="detail-block-2">
                    <div><SpeakerNotesRoundedIcon /><span>245</span></div>
                    <div><Diversity3Icon /><span>2465</span></div>
                    <div><GroupIcon /><span>577</span></div>

                </div>
                {/* <div className="detail-block-3">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, autem velit sit culpa sed error? Fugit amet earum assumenda porro ut, culpa sint harum recusandae voluptatum quia? Assumenda, voluptatibus. Harum perspiciatis eum quos magni officia sunt consectetur natus voluptates dolorum! Debitis distinctio iste porro soluta ad blanditiis, consectetur corrupti quod?
                    </p>
                </div> */}
                <div className="detail-block-4">
                    <div>
                        <PersonAddIcon />
                        <span>Follow</span>

                    </div>
                    <div>
                        <MessageIcon />
                        <span>Message</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails