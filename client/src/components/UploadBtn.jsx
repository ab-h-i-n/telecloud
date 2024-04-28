import React from 'react'

const UploadBtn = ({setOpen , children}) => {
  return (
    <>
        {children}
        <span onClick={()=>setOpen(true)}><img src="/assets/upload.svg" alt="upload" className='w-20 h-20 fixed bottom-10 right-10 ' /></span>
    </>
  )
}

export default UploadBtn