import React from 'react'

const InputText = ({placeholder , Ref}) => {
  return (
    <>
        <input className='bg-slate-800 px-2 py-3 text-white rounded' ref={Ref} type="text" placeholder={placeholder} />
    </>
  )
}

export default InputText