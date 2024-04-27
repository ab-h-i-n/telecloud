import React from 'react'

const SubmitBtn = ({text , isLoading}) => {
  return (
    <>
        <button className='rounded bg-green-800 font-medium text-lg text-white py-3 px-2' type="submit">{
            isLoading ? 'Loading...' : text
        }</button>
    </>
  )
}

export default SubmitBtn