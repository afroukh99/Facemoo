import React from 'react'
import Posts from '../components/Posts'
import Stories from '../components/Stories'
import Write from '../components/Write'

function Home() {
  return (
    <div  className='bg-bgk-2 min-h-[100vh]  px-[40px] py-[20px] z-[2]'>
     <Stories/>
     <Write/>
     <Posts/>
    </div>
  )
}

export default Home