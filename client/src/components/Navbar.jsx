import React, { useContext, useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/HomeOutlined';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { Link } from 'react-router-dom';
import { AuthContext } from ".././context/authContext";
import { DarkModeContext } from "../context/darkModeContext";
import SearchListe from './SearchListe';
import axios from 'axios';

function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext)
  const [query, setQuery] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const [filtredData, setFiltredData] = useState([""])
  const [infos, setInfos] = useState([""])


  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/users')
        setInfos(res.data)
        setFiltredData(res.data)
      } catch (er) {
        console.log(er)
      }
    }
    fetchData()
  }, [])
  const handleInput = (e) => {
    setQuery(e.target.value)
    const result = Object.values(infos).filter((user) => {
      return user.name.toLowerCase().includes(query.toLocaleLowerCase())
    })
    setFiltredData(result)
  }


  return (
    <>
      <div className='flex border-none z-40 justify-between sticky top-0 bg-bgk-1 py-3 px-6  border cursor-pointer  h-14'>
        <div className='text-txt-1 flex flex-row justify-center items-center gap-6 '>
          <Link to={'/'}>
            <span className='text-xl font-extrabold  text-logo'>Facemoo.</span>
          </Link>
          <HomeIcon className='hover:text-blue-500' />
          {darkMode
            ?
            <WbSunnyOutlinedIcon onClick={toggle} className='hover:text-blue-500' />
            :
            <DarkIcon onClick={toggle} className='hover:text-blue-500' />
          }

          <GridViewOutlinedIcon className='hover:text-blue-500' />
          <div onClick={() => setOpenSearch(!openSearch)} className='border flex py-1 w-96 rounded relative '>
            <SearchIcon className='mx-2' />
            <input type="text" name="" id="search" placeholder='Search'
              onChange={handleInput}
              value={query}
              className='text-sm  bg-transparent w-full' />
          </div>
        </div>
        <div className='flex  justify-center items-center gap-6'>
          <PersonOutlinedIcon className='text-txt-1 hover:text-blue-500' />
          <EmailOutlinedIcon className='text-txt-1 hover:text-blue-500' />
          <NotificationsOutlinedIcon className='text-txt-1 hover:text-blue-500' />
          <LogoutIcon onClick={logout} className='text-txt-1 hover:text-red-500' />
          <div className='flex  items-center justify-center gap-2'>
            <img src={"/upload/" + currentUser.profilepic} alt="" className='w-8 h-8 rounded-full object-cover ' />
            <span className='font-medium text-txt-2 ' >{currentUser.name}</span>
          </div>

        </div>
      </div>
      {openSearch &&
        <div className='bg-bgk-1 w-72 overflow-auto max-h-[300px] rounded-md shadow-md fixed  z-50 left-[285px] top-[45px] '>
          {

            <SearchListe filtredData={filtredData} setOpenSearch={setOpenSearch} query={query} />
          }

        </div>}
    </>
  )
}

export default Navbar