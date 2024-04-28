import React, { useEffect, useState } from 'react'
import Folder from '../components/Folder'
import getAllFolders from '../api/getAllFolders'

const Home = () => {
  const [folders , setFolders] = useState();
  
  useEffect(()=>{
    getAllFolders().then(folders => setFolders(folders))
  },[])

  return (
    <div className='p-5 grid grid-cols-3 h-min gap-10'>
        {
          folders?.map(folder => (
            <Folder key={folder.foldername} foldername={folder.foldername} />
          ))
        }
    </div>
  )
}

export default Home