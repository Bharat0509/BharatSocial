import './home.scss'
import Post from '../components/chats/Post'
import CreatePost from '../components/CreatePost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTimeLinePosts } from '../Actions/PostAction'
import { toast } from 'react-toastify';
import { clearErrors } from '../Actions/UserAction';
import { CREATE_POST_RESET, DELETE_POST_RESET } from '../Constants/postConstans';
import PostSkeleton from '../components/Skeltons/PostSkeleton';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducers);
  const { posts, loading, error } = useSelector((state) => state.postsReducer);
  const { isCreated } = useSelector(state => state.postReducer)
  const { isDeleted } = useSelector(state => state.postReducer)

  useEffect(() => {
    console.log("user --> ", user);
    if (error) {
      toast(error, { type: 'error' })
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast("Post Deleted Successfully ", { type: 'success' })
      dispatch(getTimeLinePosts(user._id))
      dispatch({ type: DELETE_POST_RESET })

    }
    if (isCreated) {
      toast("Post Published!");
      dispatch(getTimeLinePosts(user._id));
      dispatch({ type: CREATE_POST_RESET })
    }
    dispatch(getTimeLinePosts(user._id));
  }, [dispatch, error, isDeleted, isCreated])


  return (
    <>
      <div className="main_container">


        <div className="homepage">

          <div className="createPost">
            <CreatePost />
          </div>

          <div className="posts">

            {
              !loading ?

                posts.map((post) => {
                  return (<PostSkeleton key={post._id} loading={false} data={post} />)
                })

                :
                <>
                  <PostSkeleton loading={true} />
                  <PostSkeleton loading={true} />
                </>



            }

          </div>

        </div>

      </div>

    </>
  )
}

export default Home