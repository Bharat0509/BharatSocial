import './App.css'
import Login from './login/Login'
import Register from './register/Register'
import Home from './home/Home'
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom'
import Profile from './profile/Profile'
import Navbar from './components/navbar/Navbar'
import Leftbar from './components/leftbar/Leftbar'
import Rightbar from './components/rightbar/Rightbar'
import Post from './components/chats/Post'
import { useSelector } from 'react-redux'

function App() {

  const user = useSelector(state => state.authReducers.authData);
  const Layout = () => {
    return (
      <>
        {
          !user?.user && <Navigate to={"login"}/>
        }
        {user?.user &&
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
          path: '/profile/:id',
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
