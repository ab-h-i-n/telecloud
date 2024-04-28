import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

const Image = ({ image }) => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    const imgSrc = `data:${image.mimeType};base64,${Buffer.from(
      image.fileData
    ).toString("base64")}`;
    setImgSrc(imgSrc);
    console.log(imgSrc);
  }, []);

  return (
    <div className="w-32 grid place-items-center ">
      <div className="w-28 h-28 rounded overflow-hidden">
        <img
          src={imgSrc}
          alt={image.fileName}
          className="object-cover w-full"
        />
      </div>
      <div className="text-white font-medium text-center p-3">{image.fileName}</div>
    </div>
  );
};

export default Image;
