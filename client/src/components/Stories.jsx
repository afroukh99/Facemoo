import React, { useContext } from 'react'
import {AuthContext} from '../context/authContext'

const Stories = () => {
    const {currentUser}=useContext(AuthContext)
    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: "https://images.pexels.com/photos/16081836/pexels-photo-16081836/free-photo-of-homme-etre-assis-chapeau-visage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            name: "Adam Smith",
            img: "https://images.pexels.com/photos/15679391/pexels-photo-15679391/free-photo-of-peinture-maison-decoration-coin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 3,
            name: "Alex Vari",
            img: "https://images.pexels.com/photos/3318215/pexels-photo-3318215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 4,
            name: "Elon Musk",
            img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        },
    ];
    return (
        <div className='flex gap-2 h-[200px] mb-6 '>
            <div className='flex-1 rounded-md overflow-hidden relative'>
                <img className='w-full h-full object-cover' src={"/upload/"+currentUser.profilepic}></img>
                <button
                    className='text-white bg-blue-600 font-semibold text-lg rounded-full absolute bottom-8
                      left-2 w-[25px] h-[25px] border-none flex justify-center items-center '>
                    +
                </button>
                <span className='text-white font-[600]  text-xs absolute bottom-2 left-2'>Mo Afroukh</span>
            </div>
            {stories.map(story => (
                <div className='flex-1 rounded-md overflow-hidden relative' key={story.id}>
                    <img className='w-full h-full object-cover' src={story.img}></img>
                    <span className='text-white font-[600]  text-xs absolute bottom-2 left-2'>{story.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Stories