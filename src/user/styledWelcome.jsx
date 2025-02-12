import { styled } from "styled-components";

// 배경 (고정, 필요 시 색상만 변경)
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #7ADCDB;
  min-height: 100vh; /* 화면 크기에 맞게 자동 조절 */
  border: 1px solid #e3e3e3; /* 화면 구분선, 추후 삭제해도 됨 */
`;

export const Image = styled.img`
    width: 299px;
    height: 254px;
    margin-top: 192px;
    margin-left: 60px;
`;

export const WelcomeP = styled.p`
    color: #FFF;
    font-family: "Pretendard Variable";
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 35px;
    margin-left: 117px;
`;