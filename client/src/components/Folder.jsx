import React from "react";
import { Link } from "react-router-dom";

const Folder = ({foldername}) => {
  
  return (
    <Link to={`/${foldername}`} className="w-28 flex flex-col items-center">
      <img src="/assets/folder.svg" alt="folder" className="w-24" />
      <span className="text-white font-medium text-xl">{foldername}</span>
    </Link>
  );
};

export default Folder;
