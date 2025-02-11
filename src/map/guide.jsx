import React from "react";
import Header from "../components/Header"; // ✅ 헤더 컴포넌트 가져오기
import Footer from "../components/Footer";
import * as G from "../map/guideStyled"; // ✅ 스타일 파일 가져오기

const Guide = () => {
  return (
    <G.Container>
      <Header />
      <G.Content>
        <h2>플로깅 가이드</h2>
      </G.Content>
      <Footer />
    </G.Container>
  );
};

export default Guide;
