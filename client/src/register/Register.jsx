import './register.scss'
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../Actions/AuthAction.js'

const Register = () => {
  const dispatch = useDispatch();
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
    console.log("hello ");
    dispatch(signUp(formData))


  }
  const{ loading, error }= useSelector((state) => state.authReducers)
  const user = useSelector((state) => state.authReducers.authData);

  return (
    <>
      {
        user?.user &&
        <Navigate to={'../login'} />
      }
     

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