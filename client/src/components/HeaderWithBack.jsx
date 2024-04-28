import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const HeaderWithBack = () => {
    const {foldername} = useParams();
    const navigate = useNavigate();
  return (
    <div className='bg-slate-800 p-5  flex items-center justify-between'>
        <span onClick={()=>navigate(-1)} className='flex items-center gap-5'>
            <img src="/assets/backarrow.svg" alt="back" className='h-7 w-7' />
            <span className='text-white text-xl font-medium'>{foldername}</span>
        </span>
    </div>
  )
}

export default HeaderWithBack