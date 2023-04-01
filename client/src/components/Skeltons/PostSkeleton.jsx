import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

import EditIcon from '@mui/icons-material/Edit';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux';
import { deletePost } from '../../Actions/PostAction';



var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ITEM_HEIGHT = 48;

const options = [
    "Edit Post",
    "Delete Post",
    "Who Viewed"
];


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Media({ loading, data }) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async (e) => {
        if (e.target.innerText === "Delete Post") {
            await dispatch(deletePost(data._id))
        }
        setAnchorEl(null);
    };


    return (
        <Card sx={{ m: 2 }}>
            <CardHeader
                avatar={
                    loading ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (
                        <Link to={`/profile/${data.userId}`}>
                            <Avatar
                                alt="Ted talk"
                                src={`${data && data.user && data.user.profilePicture}`}
                            />
                        </Link>
                    )
                }
                action={
                    loading ? null : (
                        <div>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} selected={option === 'Edit Post'} onClick={handleClose}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    )
                }
                title={
                    loading ? (
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (data &&
                        `${data.user.username} `
                    )
                }
                subheader={
                    loading ? (
                        <Skeleton animation="wave" height={20} width="40%" />
                    ) : (data &&
                        `${dayjs(data.updatedAt).toNow(true)} ago`
                    )
                }
            />
            {loading ? (
                <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
            ) : (
                data && data.postImage &&
                <CardMedia
                    component="img"
                    image={data.postImage.url}
                    alt={`${data.description}`}
                />
            )}

            <CardContent>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                ) : (
                    <Typography variant="body2" color="text.secondary" component="p">
                        {
                            `${data?.description} `
                        }
                    </Typography>
                )}
            </CardContent>
            {
                !loading &&
                <>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Comments"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <CardHeader
                                avatar={
                                    loading ? (
                                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                    ) : (
                                        <Avatar
                                            alt="Ted talk"
                                            src={`${data && data.user && data.user.profilePicture}`}
                                        />
                                    )
                                }
                                title={
                                    loading ? (
                                        <Skeleton
                                            animation="wave"
                                            height={20}
                                            width="80%"
                                            style={{ marginBottom: 6 }}
                                        />
                                    ) : (data ?
                                        `${data.username} ` : "User"
                                    )
                                }
                                subheader={
                                    loading ? (
                                        <Skeleton animation="wave" height={20} width="40%" />
                                    ) : (
                                        '5 hours ago'
                                    )
                                }
                            />
                            {loading ? (
                                <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
                            ) : (
                                data && data.postImage &&

                                <CardMedia
                                    component="img"
                                    image={data.postImage.url}
                                    alt={`${data.description}`}
                                />

                            )}

                            <CardContent>
                                {loading ? (
                                    <React.Fragment>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
                                    </React.Fragment>
                                ) : (
                                    <Typography variant="body2" color="text.secondary" component="p">
                                        {data &&
                                            `${data.description} `
                                        }
                                    </Typography>
                                )}
                            </CardContent>

                        </CardContent>
                    </Collapse>
                </>
            }
        </Card>
    );
}



export default function PostSkeleton({ loading, data }) {
    return (
        <div>
            <Media loading={loading} data={data} />
        </div>
    );
}