import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Join from "./user/Join";
import Welcome from "./user/Welcome";
import Community from "./community/Community";
import Write from "./community/Write";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/community" element={<Community />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
