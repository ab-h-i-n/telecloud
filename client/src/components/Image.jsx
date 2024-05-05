import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import FileMenu from "./FileMenu";

const Image = ({ image }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const imgSrc = `data:${image.mimeType};base64,${Buffer.from(
      image.fileData
    ).toString("base64")}`;
    setImgSrc(imgSrc);
  }, []);

  return (
    <div className="w-32 grid place-items-center relative ">
      <div className="w-28 h-28 rounded overflow-hidden">
        <img
          src={imgSrc}
          alt={image.fileName}
          className="object-cover w-full"
        />
      </div>
      <span className="absolute top-3 right-2" onClick={()=>setMenuOpen(true)}>
        <img src="/assets/3dot.svg" alt="menu" className="w-5 brightness-200" />
      </span>
      <FileMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} file={{
        fileName : image.fileName,
        src : imgSrc,
      }}/>
      <div className="text-white font-medium text-center p-3">{image.fileName}</div>
    </div>
  );
};

export default Image;
