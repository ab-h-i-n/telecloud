import React from "react";


const FolderMenu = ({ isMenuOpen, className }) => {

  return (
    <div className={`${className} z-50`} >
      <div
        className={`${
          isMenuOpen ? "h-32" : "h-0"
        } transition-all overflow-hidden w-40 text-white font-medium bg-slate-700 grid divide-y-[1px] divide-slate-600 rounded`}
      >
        <div className="py-3 grid place-content-center bg-red-800 text-red-500">
          <span>Delete</span>
        </div>
        <div className="py-3 grid place-content-center">
          <span>About</span>
        </div>
      </div>
    </div>
  );
};

export default FolderMenu;
