import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Login from "./pages/LogIn.jsx";
import Signup from "./pages/SignUp.jsx";
import AiChat from "./pages/AiChat";
import Diary from "./pages/Diary.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ai/chats" element={<AiChat />} />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  );
}

export default App;
