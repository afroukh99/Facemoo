import React from 'react'
import Left from '../components/Left'
import Right from '../components/Right'
import Navbar from '../components/Navbar'





const Chat = () => {
  return (
    <div   className='flex flex-col h-screen'>
      <Navbar />
      <div style={{  height: 'calc(100vh - 56px)' }} className='flex'>
        <Left />
        <Right />
      </div>
    </div>
  )
}

export default Chat