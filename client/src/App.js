import './App.css'
import Login from './login/Login'
import Register from './register/Register'
import Home from './home/Home'
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate, useNavigate } from 'react-router-dom'
import Profile from './profile/Profile'
import Navbar from './components/navbar/Navbar'
import Leftbar from './components/leftbar/Leftbar'
import Rightbar from './components/rightbar/Rightbar'
import Post from './components/chats/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadUser } from './Actions/UserAction'
import store from './store/ReduxStore'
function App() {
  const dispatch=useDispatch();
  const {user,isAuthenticated }= useSelector(state => state.authReducers);
  

  useEffect(()=>{
    if(isAuthenticated){
      // store.dispatch(loadUser())
    }
    else{
      localStorage.clear();
    }
    
  },[])
  const Layout = () => {

    
    return (
      <>
        
        {!isAuthenticated ? <Navigate to={'/login'}/>:
          <div className='main'>
            <div className='nav'>
              <Navbar />
            </div>
            <div className='sub-main'>
              <div className='left'>
                <Leftbar />
              </div>
              <div className='middle'>
                <Outlet />
              </div>
              <div className='right'>
                <Rightbar />
              </div>
            </div>
          </div>
        }
      </>
    )
  }


  const router = createBrowserRouter([
    {
      path: '/login',
element: <Login />

    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />

        },

        {
          path: '/me/profile/:id',
          element: <Profile />

        }
      ]
    }
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
