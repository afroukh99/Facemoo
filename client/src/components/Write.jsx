import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import map from '../assets/map.png';
import friend from '../assets/friend.png';
import img from '../assets/img.png';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../axios';



const Write = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)


  const mutation = useMutation((newPost) => {
    return makeRequest.post('/posts', newPost)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("[posts]")
    }
  })

  const upload = async () => {
    try {
      const formatData = new FormData()
      formatData.append("file", file)
      const res = await makeRequest.post('/upload',formatData)
      return res.data
    } catch (err) {

    }


  }

  const handleClick = async (e) => {
    e.preventDefault()
    let imgUrl=""
    if (file) {imgUrl=await upload()}
    mutation.mutate({ desc,img:imgUrl })
    setDesc("")
    setFile(null)
  }
  return (
    <div className=' bg-bgk-1 shadow-lg mb-[20px]  rounded-lg'>
      <div className=' p-[20px]'>
        <div className='flex justify-between items-center'>
          <div className='flex   flex-[3] items-center'>
            <img className='w-[40px] h-[40px] rounded-full object-cover' src={"/upload/"+currentUser.profilepic} alt="" />
            <input
              className='text-sm bg-bgk-1 w-[60%] py-[20px] px-[10px]  text-txt-2' type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className='flex[1] flex justify-end'>
            {file && <img className='w-[80px] h-[80px] object-cover'
              src={URL.createObjectURL(file)} alt="" />}
          </div>
        </div>
        <hr className='my-[20px] h-[0.5px] border-none bg-border' />
        <div className='flex justify-between'>
          <div className='flex gap-4'>
            <input onChange={(e)=>setFile(e.target.files[0])} className='hidden' type="file" id='file' />
            <label htmlFor="file">
              <div className='flex cursor-pointer  justify-center items-center gap-2'>
                <img className='w-[20px] h-[20px]' src={img} alt="" />
                <span className='text-txt-2 text-xs'>Add Image</span>
              </div>
            </label>
            <div className='flex justify-center items-center gap-2'>
              <img className='w-[20px] h-[20px]' src={map} alt="" />
              <span className='text-txt-2 text-xs'>Add Place</span>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <img className='w-[20px] h-[20px]' src={friend} alt="" />
              <span className='text-txt-2 text-xs'>Add Friends</span>
            </div>
          </div>
          <div>
            <button
              onClick={handleClick}
              className='border-none rounded-sm p-1 font-semibold text-xs bg-blue-500 hover:bg-blue-400 text-white'>
              Share

            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write