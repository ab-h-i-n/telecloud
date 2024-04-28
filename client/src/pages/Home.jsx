import React, { useEffect, useState } from "react";
import Folder from "../components/Folder";
import getAllFolders from "../api/getAllFolders";
import Header from "../components/Header";
import Loader from "../components/Loader";
import UploadBtn from "../components/UploadBtn";
import Modal from "../components/Modal"

const Home = () => {
  const [folders, setFolders] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    getAllFolders()
      .then((folders) => setFolders(folders))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-rows-[min-content,1fr]">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-5 grid grid-cols-3 h-min gap-10">
          {folders?.map((folder) => (
            <Folder key={folder.foldername} foldername={folder.foldername} />
          ))}
          <UploadBtn setOpen={setOpen}>
            <Modal isOpen={isOpen} setOpen={setOpen} />
          </UploadBtn>
        </div>
      )}
    </div>
  );
};

export default Home;
