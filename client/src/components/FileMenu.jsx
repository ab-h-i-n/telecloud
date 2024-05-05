import React, { useState } from "react";
import deleteAFile from "../api/deleteFile";

const FileMenu = ({ isMenuOpen, setMenuOpen, file }) => {
  const [isLoading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deleteAFile(file.id)
      .then((res) => {
        alert(res.message);
      })
      .then(() => setLoading(false))
      .then(() => window.location.reload());
  };

  return (
    <div
      onClick={() => setMenuOpen(false)}
      className={`${
        isMenuOpen
          ? "opacity-1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-all fixed top-0 left-0 h-screen w-screen z-50 bg-[#00000037] backdrop-blur-sm`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        } transition-all absolute w-screen bottom-0 py-10 px-5 bg-slate-800 rounded-t-2xl grid gap-10`}
      >
        <div className="bg-slate-950 rounded p-5 flex  gap-5 items-center text-white font-medium">
          <div className="w-28">
            <img src={file.src} alt={file.fileName} className="object-cover" />
          </div>

          <span>{file.fileName}</span>
        </div>

        <div className="grid gap-3 text-white font-medium  ">
          <div className=" py-3 px-5 rounded grid place-content-center bg-slate-700">
            <span>Rename</span>
          </div>
          <div
            onClick={handleDelete}
            className=" py-3 px-5 rounded bg-red-800 grid place-content-center"
          >
            <span className="text-red-500">
              {isLoading ? "Deleting..." : "Delete"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileMenu;
