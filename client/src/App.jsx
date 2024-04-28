import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import UploadBtn from "./components/UploadBtn";
import FolderFiles from "./pages/FolderFiles"


function App() {

  return (
    <div className="grid grid-rows-[min-content,1fr] h-screen bg-slate-950">
    <Header/>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:foldername" element={<FolderFiles/>} />
      </Routes>
     </BrowserRouter>
     <UploadBtn/>
    </div>
  );
}

export default App;
