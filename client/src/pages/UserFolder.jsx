import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import getUserFiles from '../api/getUserFiles'

const UserFolder = () => {
  const { username } = useParams(); 
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    getUserFiles(username).then((files) => setUserFiles(files));
  }, [username]);

  useEffect(()=>{
    console.log(userFiles);
  },[userFiles]);

  return (
    <div>UserFolder</div>
  );
};

export default UserFolder;
