import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cover02 from '../assets/cover02.jpg'
import axios from 'axios'

function Regester() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  }
  )

  const [error, setError] = useState(null)


  console.log(values)
  const handleChange = e => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigate = useNavigate()
  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8800/api/auth/register', values);
      navigate('/login')
    } catch (err) {
      setError(err.response.data)
    }

  }

  return (
    <div>
      <div className='flex justify-center items-center bg-indigo-50 h-screen'>
        <div className='w-7/12 bg-slate-50  border  flex flex-row rounded overflow-hidden shadow-lg'>
          <div className='flex-1 flex flex-col gap-8 p-8 justify-center items-center bg-white'>
            <h1 className='text-blue-500 font-bold text-3xl'>Signup</h1>
            <input type="text" placeholder='Username' name='username' className=' border-b w-9/12 py-1' onChange={handleChange} required />
            <input type="email" placeholder='Email' name='email' className='border-b  w-9/12' onChange={handleChange} required />
            <input type="password" placeholder='Password' name='password' className='border-b  w-9/12' onChange={handleChange} required />
            <input type="text" placeholder='name' name='name' className=' border-b w-9/12 py-1' onChange={handleChange} required />
            {error && <span className='text-red-600 font-medium'>{error}</span>}
            <button onClick={handleClick} className='bg-blue-500 hover:bg-sky-500 px-7 py-1 font-mono font-bold text-white rounded'>Register</button>
          </div>
          <div className='flex-1 flex flex-col gap-4 items-center justify-center p-8  bg-cover bg-center' style={{ backgroundImage: `linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url(${cover02}) ` }}>
            <h1 className='font-extrabold text-7xl text-white'>
              Face moo.
            </h1>
            <span className='text-white text-xl font-bold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequatur que.
            </span>
            <span className='text-white font-mono font-bold'>Already  have an acount ?</span>
            <Link to={'/login'}>
              <button
                className=' px-7 bg-white py-1 font-mono font-bold text-slate-800 hover:bg-blue-700 hover:text-white rounded'>
                Login
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Regester