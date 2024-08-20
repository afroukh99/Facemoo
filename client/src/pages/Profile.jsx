import React, { useContext, useState } from 'react'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../components/Posts"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../axios'
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthContext } from '../context/authContext'
import Update from '../components/Update';


function Profile() {

  const { currentUser } = useContext(AuthContext);
  const [openModal,setOpenModal] = useState(false)

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );


  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (

    <div className='bg-bgk-2 py-2 px-5'>
      {
        isLoading
          ?
          (
            <Box className="flex justify-center items-center" >
              <CircularProgress />
            </Box>)
          :
          (
            <>
              <div className='w-full h-[300px] relative '>
                <img className=' w-full h-full object-cover ' src={"/upload/"+data.coverPic} alt="" />
                <img className='w-[150px] h-[150px] object-cover  rounded-full absolute left-[20px] right-0 m-auto top-[200px] ' src={"/upload/"+data.profilepic} alt="" />
              </div>
              <div className='px-[50px] py-[20px] '>
                <div className='flex items-center justify-between    mb-[20px] rounded-lg shadow-md bg-bgk-1 p-[10px] h-[180px]  '>
                  <div className='flex[1] flex gap-1 text-txt-2 '>
                    <a href="http://facebook.com">
                      <FacebookTwoToneIcon fontSize="medium" />
                    </a>
                    <a href="http://facebook.com">
                      <InstagramIcon fontSize="medium" />
                    </a>
                    <a href="http://facebook.com">
                      <TwitterIcon fontSize="medium" />
                    </a>
                    <a href="http://facebook.com">
                      <LinkedInIcon fontSize="medium" />
                    </a>
                    <a href="http://facebook.com">
                      <PinterestIcon fontSize="medium" />
                    </a>
                  </div>

                  <div className='flex[1] w-full flex flex-col gap-4 mr-6  items-center text-[12px]'>
                    <span className='text-txt-1 text-lg font[500]'>{data.name}</span>
                    <div className='w-full flex justify-around items-center'>
                      <div className='flex gap-3 text-txt-2 justify-center items-center'>
                        <PlaceIcon />
                        <span className=''>{data.city}</span>
                      </div>
                      <div className='flex gap-2 text-txt-2 justify-center items-center'>
                        <LanguageIcon />
                        <span>{data.website}</span>
                      </div>
                    </div>
                    {
                      rIsLoading
                        ?
                        'loading..'
                        :
                        userId === currentUser.id
                          ? (
                            <button 
                            onClick={()=>setOpenModal(true)}
                            className=' py-1 px-4 font-semibold text-xs bg-blue-500 hover:bg-blue-400 rounded-sm text-white'>Update
                            </button>)
                          :
                          relationshipData.includes(currentUser.id)
                            ?
                            (
                              <button className=' border w-20 py-1 px-4 font-semibold text-xs rounded-sm text-blue-500'
                                onClick={handleFollow}>Unfollow</button>)
                            : (
                              <button className=' py-1 px-4 w-20 font-semibold text-xs bg-blue-500 hover:bg-blue-400 rounded-sm text-white'
                                onClick={handleFollow}>Follow</button>)
                    }
                  </div>

                  <div className='flex[1] flex items-center justify-end gap-[10px] text-txt-2'>
                    <EmailOutlinedIcon />
                    <MoreVertIcon />
                  </div>
                </div>
                <Posts userId={userId} />
              </div>
              {openModal &&<Update setOpenModal={setOpenModal} user={data}/>}
            </>
          )}
    </div>

  )
}

export default Profile