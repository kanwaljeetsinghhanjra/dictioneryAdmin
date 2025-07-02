import { Routes, Route } from "react-router-dom";
import "./index.css";
import UploadPage from "./page/UploadPage";
import WordListScreen from "./page/WordList";

function App() {
  return (
    <div className="min-h-screen w-screen bg-black text-[#000000] overflow-x-hidden">
      <Routes>
        <Route path="/" element={<WordListScreen />} />
        <Route path="/add-word" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;
