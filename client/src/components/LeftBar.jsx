import React, { useContext } from 'react'
import profile from '../assets/profile.jpg';
import friend from '../assets/friend.png';
import groups from '../assets/2.png';
import Market from "../assets/3.png";
import Watch from "../assets/4.png";
import Memories from "../assets/5.png";
import Events from "../assets/6.png";
import Gaming from "../assets/7.png";
import Gallery from "../assets/8.png";
import Videos from "../assets/9.png";
import Messages from "../assets/10.png";
import Tutorials from "../assets/11.png";
import Courses from "../assets/12.png";
import Fundraiser from "../assets/13.png";
import { AuthContext } from '../context/authContext'
import { Link } from 'react-router-dom'




function LeftBar() {
  const { currentUser } = useContext(AuthContext)


  return (
    <div id='left' className='sticky top-14 cursor-pointer overflow-y-scroll scrollbar-none bg-bgk-1 '
      style={{ flex: '2', height: 'calc(100vh - 56px)' }} >
      <div className='p-5 text-txt-1 text-sm'>
        <div className='flex gap-4 flex-col '>
          <div className='flex  items-center gap-2'>
            <Link to={`/profile/${currentUser.id}`} >
              <img src={"/upload/" + currentUser.profilepic} alt="" className='w-8 h-8 rounded-full object-cover ' />
            </Link>
            <span className='font-medium  '>{currentUser.name}</span>
          </div>
          <div className='flex flex-col gap-4 '>
            <div className='flex gap-2 items-center  '>
              <img src={friend} alt="" className='w-7 ' />
              <span className='font-medium hover:text-hvr '>Friends</span>
            </div>
            <div className='flex gap-2 items-center    '>
              <img src={groups} alt="" className='w-7 ' />
              <span className='font-medium hover:text-hvr'>Groups</span>
            </div>
            <div className='flex gap-2 items-center   '>
              <img src={Market} alt="" className='w-7 ' />
              <span className='font-medium hover:text-hvr'>Marketplace</span>
            </div>
            <div className='flex gap-2 items-center   '>
              <img src={Watch} alt="" className='w-7 ' />
              <span className='font-medium hover:text-hvr'>Watch</span>
            </div>
            <div className='flex gap-2 items-center  '>
              <img src={Memories} alt="" className='w-7 ' />
              <span className='font-medium hover:text-hvr'>Memories</span>
            </div>
          </div>
        </div>
        <hr className='my-2' />
        <span className='text-sm text-slate-700 dark:text-txt-2 '>Your shortcuts</span>
        <div className='flex gap-4 flex-col mt-3'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center hover:text-hvr'>
              <img src={Events} alt="" className='w-7 ' />
              <span className='font-medium'>Events</span>
            </div>
            <div className='flex gap-2 items-center hover:text-hvr '>
              <img src={Gaming} alt="" className='w-7 ' />
              <span className='font-medium'>Gaming</span>
            </div>
            <div className='flex gap-2 items-center hover:text-hvr '>
              <img src={Gallery} alt="" className='w-7 ' />
              <span className='font-medium'>Gallery</span>
            </div>
            <div className='flex gap-2 items-center hover:text-hvr '>
              <img src={Videos} alt="" className='w-7 ' />
              <span className='font-medium'>Videos</span>
            </div>
            <div className='flex gap-2 items-center hover:text-hvr'>
              <img src={Messages} alt="" className='w-7 ' />
              <span className='font-medium'>Messages</span>
            </div>
          </div>
        </div>

        <hr className='my-2' />
        <span className='text-sm text-txt-2 '>Others</span>
        <div className='flex gap-4 flex-col mt-3'>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center hover:text-hvr '>
              <img src={Fundraiser} alt="" className='w-7 ' />
              <span className='font-medium'>Fundraiser</span>
            </div>
            <div className='flex gap-2 items-center hover:text-hvr  '>
              <img src={Tutorials} alt="" className='w-7 ' />
              <span className='font-medium'>Tutorials</span>
            </div>
            <div className='flex gap-2 items-center hover:text-hvr  '>
              <img src={Courses} alt="" className='w-7 ' />
              <span className='font-medium'>Courses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar