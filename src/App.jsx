import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Login from "./pages/LogIn.jsx";
import Signup from "./pages/SignUp.jsx";
import AiChat from "./pages/AiChat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/ai/chats" element={<AiChat />} />
    </Routes>
  );
}

export default App;
