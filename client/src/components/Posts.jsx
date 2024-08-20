import React, { useContext, useEffect, useState } from 'react'
import Post from './Post';
import { useQuery } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { makeRequest } from '../axios'
const Posts = ({userId}) => {

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId="+userId).then((res) => {
      return res.data;
    })
  );
  return (
    <div className='flex flex-col gap-8'>
      {error
        ? "Something went wrong!"
        : isLoading
          ? <Box className="flex justify-center items-center" >
            <CircularProgress />
          </Box>
          : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  )
}

export default Posts