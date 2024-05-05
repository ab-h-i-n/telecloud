import React from "react";

const FileMenu = ({ isMenuOpen, setMenuOpen, file }) => {
    

  return (
    <div
        onClick={()=>setMenuOpen(false)}
      className={`${isMenuOpen ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-all fixed top-0 left-0 h-screen w-screen z-50 bg-[#00000037] backdrop-blur-sm`}
    >
      <div onClick={(e)=>{
        e.stopPropagation();
      }} className={`${isMenuOpen ? 'translate-y-0' : 'translate-y-full'} transition-all absolute w-screen bottom-0 py-10 px-5 bg-slate-800 rounded-t-2xl grid gap-10`}>

        <div className="bg-slate-950 rounded p-5 flex  gap-5 items-center text-white font-medium">
            <div className="w-28">
                <img src={file.src} alt={file.fileName} className="object-cover" />
            </div>

            <span>{file.fileName}</span>
        </div>

        <div className="text-white font-medium grid py-3 px-5 rounded place-content-center bg-red-800 ">
          <span className="text-red-500">Delete</span>
        </div>
      </div>
    </div>
  );
};

export default FileMenu;
