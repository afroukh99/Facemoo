import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SearchListe = ({ filtredData, query,setOpenSearch }) => {
    return (
            query.length > 0 && Object.values(filtredData).map((user, index) => (
                <Link to={`/profile/${user.id}`}>
                    <div onClick={()=>setOpenSearch(false)} key={index} className='flex gap-4 items-center p-3 hover:bg-bgk-3 cursor-pointer'>
                        <img src={user.profilepic} className='w-[40px] h-[40px] rounded-full object-cover' alt="" />
                        <div className='flex flex-col'>
                            <span className='text-txt-1 text-[16px] font-[22px] '>{user.name}</span>
                            <span className='text-txt-3 text-[14px] '>@{user.username}</span>
                        </div>
                    </div>
                </Link>

            ))

    )
}

export default SearchListe