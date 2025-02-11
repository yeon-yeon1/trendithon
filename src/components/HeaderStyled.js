import styled from "styled-components"; // ✅ styled-components 불러오기

// ✅ 헤더 (뒤로 가기 버튼 + 제목)
export const Header = styled.div`
  width: 363px;
  display: flex;
  align-items: center;
  gap: 97px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  background: #e9f3f3;
  border-bottom: 1px solid #ffffff;

  /* ✅ /plogging 페이지일 때 스타일 변경 */
  ${(props) =>
    props.isPlogging &&
    `
    background: #FFFFFF;  /* ✅ 배경색 변경 */ 
    box-shadow: none;     /* ✅ 그림자 제거 */
    border: none;
    border-bottom: 8px solid #E9F3F3;

  position: absolute;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  width: 378px;
  height: 78px;
  display: flex;
  top: 0;
  padding: 0;
  gap: 0;
  padding-left: 15px;
  `}
`;

export const BackButton = styled.button`
  font-size: 20px;
  margin-right: 10px;
  background: none;
  border: none;
  cursor: pointer;

  /* ✅ /plogging 페이지일 때 스타일 변경 */
  ${(props) =>
    props.isPlogging &&
    `
    
  `}
`;
