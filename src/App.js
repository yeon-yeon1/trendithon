import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import MyPage from "./mypage/MyPage";
import MyPage2 from "./mypage/MyPage2";
import Correct from "./mypage/Correct";
import Reward from "./mypage/Reward";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mypage2" element={<MyPage2 />}></Route>
        <Route path="/correct" element={<Correct />}></Route>
        <Route path="/reward" element={<Reward />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
