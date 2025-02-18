import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import MyPage from "./mypage/MyPage";
import MyPage2 from "./mypage/MyPage2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mypage2" element={<MyPage2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
