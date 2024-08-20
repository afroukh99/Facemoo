import React, { useContext, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comment from './Comment'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../axios'
import { AuthContext } from '../context/authContext'



const Post = ({ post }) => {
    const [openComment, setOpenComment] = useState(false);
    const [openMore, setOpenMore] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const queryClient = useQueryClient()


    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId=" + post.id).then((res) => {
            return res.data;
        })
    );

    const mutation = useMutation((liked) => {
        if (liked) return makeRequest.delete('/likes?postId=' + post.id)
        return makeRequest.post('/likes', { postId: post.id })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("[likes]")
        }
    })
    const handleClick = () => {
        mutation.mutate(data.includes(currentUser.id))
    }


    const deleteMutation = useMutation((postId) => {
        return makeRequest.delete('/posts/' + postId)
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("[posts]")
        }
    })
    const handleDelete = () => {
        deleteMutation.mutate(post.id)
    }

    return (
        <div>
            <div className='flex flex-col gap-4 bg-bgk-1 shadow-lg p-4 rounded-lg relative'>
                <div className='flex justify-between'>
                    <div className='flex gap-4 justify-center items-center'>
                        <Link to={`/profile/${post.userId}`} >
                            <img className='w-[40px] h-[40px] rounded-full object-cover' src={"/upload/" + post.profilePic} />
                        </Link>
                        <div className='flex flex-col'>
                            <Link to={`/profile/${post.userId}`} className='font-[600] text-txt-2 text-xs'>{post.name}</Link>
                            <span className='text-[10px] text-txt-2'>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setOpenMore(!openMore)} className='text-txt-2 cursor-pointer relative' />
                </div>
                {openMore && currentUser.id === post.userId && <button onClick={handleDelete} className=' rounded-sm p-1 absolute top-[40px] right-[10px] font-semibold text-xs  bg-red-500 hover:bg-red-400 text-white'>Delete</button>}

                <div className='flex flex-col gap-3'>
                    <span className='text-txt-1 text-sm'>{post.desc}</span>
                    <img src={"./upload/" + post.img} className='w-full max-h-[500px] object-cover' alt="" />
                </div>
                <div className='flex gap-3 cursor-pointer'>
                    <div className='flex gap-2 justify-center items-center'>

                        {
                            isLoading ?
                                "Loading .."
                                :
                                data.includes(currentUser.id) ?
                                    <FavoriteIcon className='text-red-500 ' onClick={handleClick} />
                                    :
                                    <FavoriteBorderOutlinedIcon className='text-txt-1 ' onClick={handleClick} />
                        }
                        {
                            <span className='text-xs text-txt-1'>{data?.length} Likes</span>
                        }
                    </div>
                    <div onClick={() => setOpenComment(!openComment)} className='flex gap-2 justify-center items-center'>
                        <TextsmsOutlinedIcon className='text-txt-1' />
                        <span className='text-xs text-txt-1'> Comments</span>
                    </div>
                    <div className='flex gap-2 justify-center items-center'>
                        <ShareOutlinedIcon className='text-txt-1' />
                        <span className='text-xs text-txt-1'>Share</span>
                    </div>
                </div>
                {openComment && <Comment postId={post.id} />}
            </div>
        </div>
    )
}

export default Post