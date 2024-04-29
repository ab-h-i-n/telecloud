import React, { useRef, useState } from 'react'
import InputText from './InputText'
import SubmitBtn from './SubmitBtn'
import InputFile from './InputFile'
import uploadFile from '../api/uploadFile'

const Modal = ({isOpen, setOpen}) => {
    const fileRef = useRef();
    const folderNameRef = useRef();
    const fileNameRef = useRef();
    const [isLoading, setLoading] = useState(false);

  return (
    <div onClick={()=>{
        setOpen(false);
    }} className={`${isOpen ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-all backdrop-blur-sm backdrop-brightness-50 z-50 left-0  fixed top-0 w-screen h-screen `}>

        <form onClick={(e)=>{
            e.stopPropagation();
        }} onSubmit={async(e)=>{
            e.preventDefault();
            await uploadFile(fileRef.current.files[0], folderNameRef.current.value, fileNameRef.current.value , setLoading).then(()=>{
                setOpen(false);
                window.location.reload();
            })
        }} className='grid gap-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

            <InputText Ref={folderNameRef} placeholder={'Foldername'} />
            <InputText Ref={fileNameRef} placeholder={'Filename'} />
            <InputFile fileRef={fileRef} />
            <SubmitBtn text={'Upload'} isLoading={isLoading} />
        </form>

    </div>
  )
}

export default Modal