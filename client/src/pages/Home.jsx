import React, { useEffect, useState } from 'react'
import Folder from '../components/Folder'
import getAllUsers from '../api/getAllUsers'

const Home = () => {
  const [users , setUsers] = useState();
  
  useEffect(()=>{
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setUsers(users);
    }
    fetchUsers();
  },[])

  return (
    <div className='p-5 grid grid-cols-3 h-min gap-10'>
      <Folder key={'user0'} username={'user0'} />
        {
          users?.map(user => (
            <Folder key={user.username} username={user.username} />
          ))
        }
    </div>
  )
}

export default Home