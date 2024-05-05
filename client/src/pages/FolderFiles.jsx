import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import getFiles from "../api/getFiles";
import FolderHeader from "../components/FolderHeader";
import Loader from "../components/Loader";
import UploadBtn from "../components/UploadBtn";
import FolderModal from "../components/FolderModal";

const FolderFiles = () => {
  const { foldername } = useParams();
  const [files, setFiles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
 

  useEffect(() => {
    getFiles(foldername)
      .then((files) => {
        setFiles(files);
      })
      .finally(() => setLoading(false));
  }, [foldername]);

  return (
    <div className="grid grid-rows-[min-content,1fr]">
      <FolderHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-5 place-items-center grid grid-cols-2 h-min">
          {files?.map((file, index) => (
            <Image key={file.fileName + "_" + index} image={file} />
          ))}
          <UploadBtn setOpen={setOpen}>
            <FolderModal
              isOpen={isOpen}
              setOpen={setOpen}
              folderName={foldername}
            />
          </UploadBtn>
        </div>
      )}
    </div>
  );
};

export default FolderFiles;
