import './register.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../Actions/AuthAction.js'
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.authReducers)
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(formData))
  }

  useEffect(() => {
    if (error) {
      toast(error.message);
    }
    if (user) {
      navigate('/');
    }



  }, [])
  return (
    <>
      {/* {
        user?.user &&
        <Navigate to={'../login'} />
      }
      */}

      <div className="register">
        <div className="card">
          <div className="right">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

              <input type="text" placeholder='Username' name="username" onChange={handleChange} value={formData.username} />
              <input type="text" placeholder='Name' name="name" onChange={handleChange} value={formData.name} />
              <input type="email" placeholder='Email' name="email" onChange={handleChange} value={formData.email} />
              <input type="password" placeholder='Password' name="password" onChange={handleChange} value={formData.password} />

              <button type='submit' disabled={loading} >
                {loading ? "Loading..." : "Register"}
              </button>
            </form>


          </div>
          <div className="left">
            <h1>Social Things</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam officia quis pariatur hic sapiente sed iste vitae repellat, accusamus speriores!lorem4
            </p>

            <span>Already have an account?</span>
            <Link to='/login'><button>Login</button></Link>

          </div>

        </div>
      </div>
    </>
  )
}

export default Register