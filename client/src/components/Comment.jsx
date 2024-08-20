import React, { useContext, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeRequest } from '../axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'


const Comment = ({ postId }) => {
    const queryClient = useQueryClient()
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("")

    const mutation = useMutation((newComment) => {
        return makeRequest.post('/comments', newComment)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("[comments]")
        }
    })

    const handleClick = async (e) => {
        e.preventDefault()
        mutation.mutate({ desc, postId })
        setDesc("")
    }

    

    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?postId="+ postId).then((res) => {
            return res.data;
        })
    );
    return (
        <div className='flex flex-col gap-5 my-5 justify-between items-center'>
            <div className='flex gap-3 w-full'>
                <img src={"/upload/"+currentUser.profilepic} className='w-[30px]  h-[30px] object-cover rounded-full' alt="" />
                <input
                    onChange={(e) => { setDesc(e.target.value) }}
                    value={desc}
                    name='desc'
                    className='border flex-[5] rounded-sm bg-transparent p-[6px] text-sm text-txt-2' type="text" placeholder=' add a comment' />
                <button
                    onClick={handleClick}
                    className='bg-blue-600 rounded-sm  p-1 text-white text-sm'>
                    Send
                </button>
            </div>
            {
                isLoading ?
                    <Box className="flex justify-center items-center" >
                        <CircularProgress />
                    </Box>
                    :
                    error
                        ?
                        "Something went wrong!"
                        :
                        data.map(comment => (
                            <div key={comment.id} className='flex gap-3 justify-between items-center w-full my-[10px] '>
                                <img src={"/upload/"+comment.profilePic} className='w-[30px] h-[30px] object-cover rounded-full' alt="" />
                                <div className='flex flex-col flex-[5] items-start gap-[3px]'>
                                    <span className='text-txt-1 text-[14px] '>{comment.name}</span>
                                    <p className='text-[13px] text-txt-2'>{comment.desc}</p>
                                </div>
                                   <span className='text-txt-1 text-[12px] flex[1] self-center'>{moment(comment.createdAt).fromNow()}</span> 
                            </div>
                        ))}
        </div>
    )
}

export default Comment