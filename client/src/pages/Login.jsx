import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cover from '../assets/cover.jpg'
import { AuthContext } from ".././context/authContext";

function Login() {
  const [values, setValues]= useState({
    username: "",
    password: ""
  }
  )
  const [error, setError] = useState(null)

  const handleChange = e => {
    setValues(prev => ({ ...prev, [e.target.value]: e.target.name }))
  }
  
  const navigate = useNavigate()
  const {login} = useContext(AuthContext)
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await login(values)
      navigate('/')
    } catch (err) {
      setError(err.response.data);
    }

  }

  return (
    <div>
      <div className='flex justify-center items-center bg-indigo-50 h-screen'>
        <div className='w-7/12 bg-slate-50   border rounded overflow-hidden  flex flex-row shadow-lg'>
          <div className='flex-1 flex flex-col gap-4 items-center justify-center bg-cover bg-center  p-8' style={{ backgroundImage: `linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url(${cover})` }}>
            <h1 className='font-extrabold text-7xl text-white'>
              Hello World.
            </h1>
            <span className='text-white text-xl font-extrabold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequatur que.
            </span>
            <span className='text-white font-bold font-mono'>Do you have any acount ?</span>
            <Link to={'/regester'}>
              <button
                className=' px-7 bg-white py-1 font-mono font-bold text-slate-800 hover:bg-blue-700 hover:text-white rounded'>
                Register
              </button>
            </Link>
          </div>
          <div className='flex-1 flex flex-col gap-6 p-8 justify-center items-center bg-white'>
            <h1 className='text-blue-500 font-bold text-3xl mb-2'>Login</h1>
            <input type="text" placeholder='Username' name='username' className=' border-b w-9/12 py-1 mb-2' onChange={handleChange} required />
            <input type="password" placeholder='Password' name='password' className='border-b  w-9/12 mb-2' onChange={handleChange} required />
            <Link><span className='text-indigo-950 font-semibold text-sm font-mono'>forgot password ?</span></Link>
            {error && <span className='text-red-500'>{error}</span>}
            <button onClick={handleClick} className='bg-blue-500 hover:bg-sky-600 px-7 py-1 font-mono font-bold text-white rounded'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login