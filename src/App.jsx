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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ai/chats" element={<AiChat />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/statics" element={<Statics />} />
      <Route path="/home" element={<Home />} />
      <Route path="/photobook" element={<Photo_book />} />
      <Route path="/editDiary" element={<EditDiary />} />
    </Routes>
  );
}

export default App;
