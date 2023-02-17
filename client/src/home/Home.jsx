import './home.scss'
import Post from '../components/chats/Post'
import CreatePost from '../components/CreatePost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTimeLinePosts } from '../Actions/PostAction'

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authReducers.authData);
  const { posts, loading, error } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimeLinePosts(user?._id));
  }, [])


  return (
    <>
    {
      error &&
      <p>{error}</p>
    }
      
        <div className="main_container">


          <div className="homepage">

            <div className="createPost">
              <CreatePost />
            </div>

            <div className="posts">

              {

                posts?.map((post) => {
                  return (<Post key={post._id} data={post} />)
                })
              }

            </div>

          </div>

        </div>
      
    </>
  )
}

export default Home