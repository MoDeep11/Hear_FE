import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Login from "./pages/LogIn.jsx";
import Signup from "./pages/SignUp.jsx";
import AiChat from "./pages/AiChat";
import Diary from "./pages/Diary.jsx";
import Photo_book from "./pages/PhotoBook.jsx";
import Mypage from "./pages/MyPage.jsx";
import Statics from "./pages/Statics.jsx";
import Home from "./pages/Home.jsx";
import EditDiary from "./pages/EditDiary.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();
useEffect(() => {
  const checkTokenExpiry = () => {
    const token = localStorage.getItem("accessToken"); 
    const expiry = localStorage.getItem("tokenExpiry");

    if (!token) {
      return;
    }

    const expiryMs = Number(expiry);
    const now = Date.now();
    
    if (!expiry || !Number.isFinite(expiryMs) || now > expiryMs) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      navigate("/");
    }
  };

  checkTokenExpiry();
  const interval = setInterval(checkTokenExpiry, 60000);

  return () => clearInterval(interval);
}, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ai/chats" element={<AiChat />} />
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/statics" element={<Statics />} />
      <Route path="/home" element={<Home />} />
      <Route path="/photobook" element={<Photo_book />} />
      <Route path="/editDiary/:id" element={<EditDiary />} />
    </Routes>
  );
}

export default App;
