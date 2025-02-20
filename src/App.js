import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./user/Login";
import Join from "./user/Join";
import Welcome from "./user/Welcome";
import Community from "./community/Community";
import Write from "./community/Write";
import Map from "./map/map";
import Verification from "./map/Verification";
import Guide from "./map/guide";
import GlobalStyle from "./GlobalStyle"; // 🔹 전역 스타일 파일 불러오기
import Admin from "./map/Admin";
import AdminDetail from "./map/AdminDetail";

// 참고용 페이지(지도나 가이드페이지)들 경로 설정 해놓음. 추후 삭제
import MapReference from "./Extra/MapReference";
import SplashReference from "./Extra/SplashReference";

function App() {
  return (
    <>
      {/* 일단 맑은 고딕 전체 적용해놓음. */}
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/welcome" element={<Welcome />} />

          <Route path="/plogging" element={<Map />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/detail/:id" element={<AdminDetail />} />

          <Route path="/community" element={<Community />} />
          <Route path="/write" element={<Write />} />

          {/* 참고용 페이지(지도나 가이드페이지)들 경로 설정 해놓음. 추후 삭제 */}
          <Route path="/rm" element={<MapReference />} />
          <Route path="/rs" element={<SplashReference />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
