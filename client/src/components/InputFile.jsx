import React, { useEffect, useState } from 'react'

const InputFile = ({fileRef}) => {
    
    const [fileName , setFileName] = useState('No files selected')

    const handleFileChange = () => {
        
        if( fileRef.current.files.length > 0){
            setFileName(fileRef.current.files[0].name)
        }
    }
   
  return (
    <label htmlFor='file' className='bg-slate-800 text-white rounded overflow-hidden flex items-center gap-3'>
        <input type="file" id='file' ref={fileRef} onChange={handleFileChange} hidden  />
        <div className='bg-slate-700 w-min py-2 px-4 text-center text-slate-400'>Upload <br /> File</div>
        <div>{fileName}</div>
    </label>
  )
}

export default InputFile