import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Map from "./map/map";
import Verification from "./map/Verification";
import Guide from "./map/guide";
import GlobalStyle from "./GlobalStyle"; // 🔹 전역 스타일 파일 불러오기
import Admin from "./map/Admin";
import AdminDetail from "./map/AdminDetail";

function App() {
  return (
    <>
      {/* 일단 맑은 고딕 전체 적용해놓음. */}
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/plogging" element={<Map />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/detail/:id" element={<AdminDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
