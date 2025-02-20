import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: rgba(122, 220, 219, 0.10);
  min-height: 100vh; /* 화면 크기에 맞게 자동 조절 */
  border: 1px solid #e3e3e3; /* 화면 구분선, 추후 삭제해도 됨 */
`;

export const JoinHeader = styled.div`
    width: 393px;
    height: 70px;
    display: flex;
    border-bottom: 1px solid #FFF;
`;

export const WriteIcon = styled.img`
    width: 60px;
    height: 60px;
    position: fixed;
    top: 80%;
    left: 56.5%;
`;