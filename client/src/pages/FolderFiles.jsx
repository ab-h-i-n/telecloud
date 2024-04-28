import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import getFiles from "../api/getFiles";

const FolderFiles = () => {
  const { foldername } = useParams();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles(foldername).then((files) => {
      setFiles(files);
    });
  }, [foldername]);

  return (
    <div className="p-5 place-items-center grid grid-cols-2 h-min">
      {files?.map((file, index) => (
        <Image key={file.filename} image={file} />
      ))}
    </div>
  );
};

export default FolderFiles;
