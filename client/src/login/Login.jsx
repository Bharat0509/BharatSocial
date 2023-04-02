import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { clearErrors, logIn } from '../Actions/AuthAction.js'
import { useEffect } from 'react';
import { toast } from 'react-toastify';



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message, user } = useSelector((state) => state.authReducers);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(formData));
  }
  useEffect(() => {
    if (error) {
      toast(error, { theme: 'light', type: 'error' })
      dispatch(clearErrors())
    }
    if (user) {
      toast(`Welcome Mr.${user.username}`, { theme: 'light', type: 'success' })
      navigate('/')
    }
  }, [dispatch, navigate, error, user])

  return (
    <>

      <div className="login">
        <div className="card">
          <div className="left">
            <h1>Hello World.</h1>
            <p>Join Our Great And Connect with Millions Of People World Wide and Find People With Similar Intrest.
            </p>

            <span>Don't you have an account?</span>
            <Link to='/register'><button>
              Register
            </button></Link>

          </div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

              <input type="text" placeholder='Username' name="username" value={formData.username} onChange={handleChange} />
              <input type="password" placeholder='Password' name="password" value={formData.password} onChange={handleChange} />
              {/* <div className="err" >
                {
                  <h6>{loading ? "" : user}</h6>
                }
              </div> */}
              <button type='submit' disabled={loading} >{loading ? "Signing..." : "Login"}</button>
            </form>
          </div>

        </div>
      </div>


    </>
  )
}

export default Login