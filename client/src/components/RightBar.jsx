import React from 'react'
import profile from '../assets/profile.jpg';

function RightBar() {
  return (
    <div style={{ height: 'calc(100vh - 56px)' }} className='bg-bgk-2 sticky top-14 flex-[3.5]   cursor-pointer overflow-y-scroll scrollbar-none '>
      <div className='p-4 flex flex-col gap-2'>
        {/*----------- Suggestions For You Section ----------------- */}
        <div className='flex flex-col gap-4 p-5 shadow-md   text-xs bg-w bg-bgk-1'>
          <span className='text-txt-1 font-semibold text-xs '>Suggestions For You</span>
          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2'>
              <img src={profile} alt="" className='w-8 h-8 rounded-full object-cover ' />
              <span className='font-semibold text-txt-1 ' >Mo Afroukh</span>
            </div>
            <div className='flex  items-center justify-center gap-2'>
              <button className=' rounded-sm p-1 font-semibold text-xs bg-blue-500 hover:bg-blue-400 text-white'>follow</button>
              <button className=' rounded-sm p-1 font-semibold text-xs  bg-red-500 hover:bg-red-400 text-white'>dismiss</button>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2'>
              <img src={profile} alt="" className='w-8 h-8 rounded-full object-cover ' />
              <span className='font-semibold text-txt-1' >Mo Afroukh</span>
            </div>
            <div className='flex  items-center justify-center gap-2'>
              <button className='border-none rounded-sm p-1 font-semibold text-xs  bg-blue-500 hover:bg-blue-400 text-white'>follow</button>
              <button className='border-none rounded-sm p-1 font-semibold text-xs  bg-red-500 hover:bg-red-400 text-white'>dismiss</button>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div>
        </div>
        {/*----------- Latest Activities Section ----------------- */}
        <div className='flex flex-col gap-4 p-5 shadow-md   text-xs bg-bgk-1'>
          <span className='text-txt-1  font-semibold  text-xs'>Latest Activities</span>
          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2'>
              <img src={profile} alt="" className='w-8 h-8 rounded-full object-cover ' />
              <span className='font-semibold text-txt-1' >Mo Afroukh</span>
              <span className='text-txt-2  text-xs'>liked a post</span>
            </div>
            <div className='flex  items-center justify-center gap-2'>
              <span className='text-txt-2 text-xs'>1 min ago</span>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2'>
              <img src={profile} alt="" className='w-8 h-8 rounded-full object-cover ' />
              <span className='font-semibold text-txt-1' >Mo Afroukh</span>
              <span className='text-txt-2  text-xs'>liked a post</span>
            </div>
            <div className='flex  items-center justify-center gap-2'>
              <span className='text-txt-2 text-xs'>1 min ago</span>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2'>
              <img src={profile} alt="" className='w-8 h-8 rounded-full object-cover ' />
              <span className='font-semibold text-txt-1' >JohnDoe</span>
              <span className='text-txt-2 text-xs'>changed thier profile picture</span>
            </div>
            <div className='flex  items-center justify-center gap-2'>
              <span className='text-txt-2 text-xs'>7 min ago</span>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2'>
              <img src={profile} alt="" className='w-8 h-8 rounded-full object-cover ' />
              <span className='font-semibold text-txt-1' >Mo Afroukh</span>
              <span className='text-txt-2 text-xs'>liked a post</span>
            </div>
            <div className='flex  items-center justify-center gap-2'>
              <span className='text-txt-2 text-xs'>1 min ago</span>
            </div>
          </div>

        </div>
        <div>
        </div>
        <div>
        </div>
        {/*----------- Online Friends Section ----------------- */}

        <div className='flex flex-col gap-4 p-5 shadow-md   text-xs bg-bgk-1 '>
          <span className='text-txt-2 font-semibold text-xs'>Online Friends</span>
          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2 relative'>
              <img src={profile} alt="" className=' w-8 h-8 rounded-full object-cover ' />
              <div className=' w-2.5 h-2.5 absolute top-0 left-6 rounded-full   bg-green-500'></div>
              <span className='font-semibold text-txt-1' >Mo Afroukh</span>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2 relative'>
              <img src={profile} alt="" className=' w-8 h-8 rounded-full object-cover  ' />
              <div className='  w-2.5 h-2.5 absolute top-0 left-6 rounded-full   bg-green-500'></div>
              <span className='font-semibold text-txt-1' >Mo Afroukh</span>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2 relative'>
              <img src={profile} alt="" className='w-8 h-8 rounded-full object-cover  ' />
              <div className='  w-2.5 h-2.5 absolute top-0 left-6 rounded-full  bg-green-500'></div>
              <span className='font-semibold text-txt-1' >JohnDoe</span>
            </div>
          </div>

          <div className='flex justify-between'>
            <div className='flex  items-center justify-center gap-2 relative'>
              <img src={profile} alt="" className=' w-8 h-8 rounded-full object-cover ' />
              <div className='w-2.5 h-2.5 absolute top-0 left-6 rounded-full   bg-green-500 '></div>
              <span className='font-semibold text-txt-1' >Mo Afroukh</span>
            </div>
          </div>

        </div>
        <div>
        </div>
        <div>
        </div>

      </div>
    </div>
  )
}

export default RightBar