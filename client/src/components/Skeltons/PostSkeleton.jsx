import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, dislikePost, likePost } from '../../Actions/PostAction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getComments, newComment } from '../../Actions/CommentAction';


var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const ITEM_HEIGHT = 48;

const options = [
    "Edit Post",
    "Delete Post",
    "More"
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

    const { user } = useSelector(state => state.authReducers)
    const { likeDislikeLoading, likeDislikeError, comments, loading: postLoading } = useSelector(state => state.postReducer)
    const [expanded, setExpanded] = React.useState(false);

    const [comment, setComment] = React.useState('')
    const [isOpen, setIsOpen] = React.useState(false)
    const submitCommentToggle = () => {
        setIsOpen(!isOpen)
    }
    const commentSubmitHandler = () => {
        const commentData = {
            'comment': comment,
            "post": data._id
        }
        dispatch(newComment(commentData));
        setIsOpen(false);
    }

    const handleExpandClick = () => {
        if (!expanded) {
            dispatch(getComments(data._id));

        }
        if (!postLoading)
            setExpanded(!expanded);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLiked, setIsLiked] = React.useState(data?.likes?.includes(user._id) ? "red" : "")
    const handleLike = (e) => {
        if (likeDislikeLoading) return false;
        { isLiked === "red" ? setIsLiked("") : setIsLiked("red") }
        if (isLiked !== "red") {
            dispatch(likePost(data._id, user._id));
        }
        else {
            dispatch(dislikePost(data._id, user._id))
        }

    }
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async (e) => {
        if (e.target.innerText === "Delete Post") {
            dispatch(deletePost(data._id))
        }
        setAnchorEl(null);
    };

    React.useEffect(
        () => {

        },
        [postLoading, comments]
    )
    return (
        <Card sx={{ m: 1 }}>
            <CardHeader
                avatar={
                    loading ? (
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    ) : (
                        <Link to={`/profile/${data.user._id}`}>
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
                        `${dayjs(data.createdAt).toNow(true)} ago`
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
                        <IconButton aria-label="Like" onClick={handleLike} style={{ color: isLiked }}>
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
                            <Button title='Add Comment' variant="outlined" onClick={e => setIsOpen(true)} >Add Comment</Button>
                        </CardContent>

                        <>
                            {
                                comments && comments.length > 0 &&
                                comments.map(
                                    (comment) => {
                                        <><CardContent style={{ borderTop: `1px solid rgb(228, 230, 246)` }}>
                                            <CardHeader
                                                width={10}
                                                height={10}
                                                avatar={
                                                    loading ? (
                                                        <Skeleton animation="wave" variant="circular" width={20} height={20} />
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
                                                            height={10}
                                                            width="80%"
                                                            style={{ marginBottom: 2 }}
                                                        />
                                                    ) : (data ?
                                                        `${data.username} ` : "User"
                                                    )
                                                }
                                                subheader={
                                                    loading ? (
                                                        <Skeleton animation="wave" height={10} width="40%" />
                                                    ) : (
                                                        '5 hours ago'
                                                    )
                                                }

                                            />
                                            <CardContent>
                                                {loading ? (
                                                    <React.Fragment>
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 2 }} />
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
                                        </CardContent >
                                        </>
                                    }

                                )
                            }

                        </>
                        <CardContent>
                            <Dialog
                                aria-labelledby='simple-dialog-title'
                                open={isOpen}
                                onClose={submitCommentToggle}
                            >
                                <DialogTitle>Add Comment</DialogTitle>
                                <DialogContent className="submitDialog">

                                    <textarea
                                        className='submitDialogTextArea'
                                        style={{ padding: '1vmax', fontSize: '1.2vmax' }}
                                        placeholder='Write  a Comments here...'
                                        cols={30}
                                        rows={5}
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                    >
                                    </textarea>
                                    <DialogActions>
                                        <Button onClick={submitCommentToggle} color='secondary'> Cancle</Button>
                                        <Button onClick={commentSubmitHandler} color='primary'>Comment</Button>
                                    </DialogActions>
                                </DialogContent>
                            </Dialog>
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