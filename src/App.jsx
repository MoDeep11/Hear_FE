import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main.jsx"
import Login from "./pages/LogIn.jsx"
import Signup from "./pages/SignUp.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
    </Routes>
  );
}

export default App;
