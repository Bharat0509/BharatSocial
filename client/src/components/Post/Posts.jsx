import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Posts.scss'
import PostSkeleton from '../Skeltons/PostSkeleton';
import { getPostData } from '../../Actions/UserAction';

const Posts = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const { user, isFollowed } = useSelector(state => state.authReducers)
    const { profile: currentUser, loading: userLoading, error } = useSelector(state => state.profileReducer)
    const { posts, loading: postsLoading, error: postsError } = useSelector(state => state.postsReducer)

    useEffect(() => {
        dispatch(getPostData(user._id));

    }, [])

    return (
        <div className="posts-container">
            {!postsLoading ?
                posts?.map((post) => {
                    return (<PostSkeleton key={post._id} data={post} />)
                })
                :
                <>
                    <PostSkeleton loading={true} />
                    <PostSkeleton loading={true} />
                </>
            }
        </div>
    )
}

export default Posts