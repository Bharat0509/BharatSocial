import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { logIn } from '../Actions/AuthAction.js'
import { useEffect } from 'react';



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducers.authData);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const loading = useSelector((state) => state.authReducers.loading)

  const err = useSelector((state) => state.authReducers.error)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(formData));
  }

  return (
    <>
        {
          user?.user &&
          navigate('/')
        }
        <div className="login">
          <div className="card">
            <div className="left">
              <h1>Hello World.</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia quis pariatur hic sapiente sed iste vitae repellat, accusamus speriores!lorem4
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
                <div className="err" >
                    {
                      <h6>{loading?"":user}</h6>
                    }
                </div>
                <button type='submit' disabled={loading} >{loading ? "Loading..." : "Login"}</button>
              </form>




            </div>

          </div>
        </div>
      

    </>
  )
}

export default Login