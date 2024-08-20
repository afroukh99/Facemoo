import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { makeRequest } from '../axios'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import pic from "../assets/pic44.jpg"
import cvr from "../assets/cover44.png"


const Update = ({ setOpenModal, user }) => {
    const [profile, setProfile] = useState(null)
    const [cover, setCover] = useState(null)
    const [values, setValues] = useState(
        {
            email: user.email,
            name: user.name,
            city: user.city,
            website: user.website,    
        }
    )

    const queryClient = useQueryClient()

    const mutation = useMutation((user) => {
        return makeRequest.put('/users', user)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("[user]")
        }
    })

    const upload = async (file) => {
        try {
            const formatData = new FormData()
            formatData.append("file", file)
            const res = await makeRequest.post('/upload', formatData)
            return res.data
        } catch (err) {

        }


    }

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }


    const handleClick = async (e) => {
        e.preventDefault()
        let profileUrl;
        let coverUrl;
        profileUrl = profile ? await upload(profile) :user.profilepic;
        coverUrl = cover ? await upload(cover):user.coverPic;
        mutation.mutate({ ...values, profilepic: profileUrl, coverPic: coverUrl })
        setOpenModal(false)
    }
    return (
        <div className='fixed top-0 left-0  m-auto  z-50 bg-[rgba(0,0,0,0.3)] flex justify-center items-center w-screen h-screen '>
            <div className='flex flex-col gap-[20px]  w-1/2 h-5/6 bg-bgk-1 p-[40px] relative shadow-lg rounded-md z-50'>
                <h1 className='font-bold text-xl text-zinc-400'>Update Your Profile</h1>
                <form action="">
                    <div className='flex gap-8  items-center'>
                        <label htmlFor="profile">
                            <span className='text-sm text-txt-2'>Profile picture</span>
                            <div className='relative'>
                                <img src={profile?URL.createObjectURL(profile):"/upload/"+user.profilepic}
                                 className='w-[100px]  h-[100px] object-cover' alt="" />
                                 <CloudUploadIcon className='absolute top-0 left-0 right-0 bottom-0 m-auto font-[30px] text-[#D3D3D3] cursor-pointer'/>
                            </div>
                        </label>
                        <input type="file" id='profile' className='hidden' onChange={(e) => setProfile(e.target.files[0])} />

                        <label htmlFor="cover">
                            <span className='text-sm text-txt-2 m-b-[4px]'>Cover picture</span>
                            <div className='relative'>
                                <img src={cover?URL.createObjectURL(cover):"/upload/"+user.coverPic}
                                 className='w-[100px] h-[100px]  object-cover' alt="" />
                                 <CloudUploadIcon className='absolute top-0 left-0 right-0 bottom-0 m-auto font-[30px] text-[#D3D3D3] cursor-pointer'/>
                            </div>
                        </label>
                        <input type="file" id='cover'  className='hidden' onChange={(e) => setCover(e.target.files[0])} />
                    </div>
                    <div className='flex flex-col gap-1 mt-2'>
                        <label className='text-txt-2 text-sm  bg-transparent' htmlFor="email" >Email</label>
                        <input id='email' name='email' type="email" className='border bg-bgk-1 text-txt-1'  onChange={handleChange} />
                        <label className='text-txt-2 text-sm  bg-transparent' htmlFor="name">Name</label>
                        <input id='name' name='name' type="text" className='border bg-bgk-1 text-txt-1'  onChange={handleChange} />
                        <label className='text-txt-2 text-sm  bg-transparent' htmlFor="website">Website</label>
                        <input id='website' name='website' type="text" className='border bg-bgk-1 text-txt-1'  onChange={handleChange} />
                        <label className='text-txt-2 text-sm  bg-transparent' htmlFor="city">City</label>
                        <input id='city' name='city' type="text" className='border bg-bgk-1 text-txt-1'  onChange={handleChange} />
                    </div>
                </form>
                <button 
                className='rounded-sm p-2 font-semibold text-xs bg-blue-600 hover:bg-blue-500 text-white'
                onClick={handleClick}>Update</button>
                <button className='absolute top-2 right-4  rounded-sm p-1 font-semibold text-xs  bg-red-500 hover:bg-red-400 text-white' onClick={() => setOpenModal(false)}>Close</button>
            </div>
        </div>
    )
}

export default Update