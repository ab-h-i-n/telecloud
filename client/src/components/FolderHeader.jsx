import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderMenu from "./FolderMenu";
import { useDetectClickOutside } from "react-detect-click-outside";

const HeaderWithBack = () => {
  const { foldername } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuClose = () => {
    if (isMenuOpen) {
      setMenuOpen(false);
    }
  };

  const ref = useDetectClickOutside({ onTriggered: handleMenuClose });

  return (
    <div
      className="bg-slate-800 p-5  flex items-center justify-between"
      ref={ref}
    >
      <span onClick={() => navigate(-1)} className="flex items-center gap-5">
        <img src="/assets/backarrow.svg" alt="back" className="h-7 w-7" />
        <span className="text-white text-xl font-medium flex gap-5 items-center">
          <img src="/assets/folder.svg" alt="folder" className="w-16" />
          <span>{foldername}</span>
        </span>
      </span>

      <span className="relative">
        <span onClick={() => setMenuOpen(!isMenuOpen)}>
          <img src="/assets/3dot.svg" alt="menu" className="w-7" />
        </span>
        <FolderMenu
          className={"absolute top-full right-1/2"}
          isMenuOpen={isMenuOpen}
        />
      </span>
    </div>
  );
};

export default HeaderWithBack;
