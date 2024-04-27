import React, { useState } from 'react'
import Modal from './Modal'

const UploadBtn = () => {
    const [isOpen, setOpen] = useState(false);
  return (
    <>
        <Modal isOpen={isOpen} setOpen={setOpen} />
        <span onClick={()=>setOpen(true)}><img src="/assets/upload.svg" alt="upload" className='w-20 h-20 fixed bottom-10 right-10 ' /></span>
    </>
  )
}

export default UploadBtn