import styled from "styled-components";

export const Header = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isPlogging", "isAdmin", "isAdminDetail", "isJoin"].includes(prop),
})`
  width: 363px;
  display: flex;
  align-items: center;
  gap: 97px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  background: #e9f3f3;
  border-bottom: 1px solid #ffffff;

  ${({ isPlogging }) =>
    isPlogging &&
    `
    background: #FFFFFF;  
    box-shadow: none;    
    border: none;
    border-bottom: 8px solid #E9F3F3;

    position: absolute;
    transform: translate(-50%, -50%);
    width: 378px;
    height: 78px;
    display: flex;
    top: 0;
    padding: 0;
    gap: 0;
    padding-left: 15px;
  `}

  ${({ isAdmin }) =>
    isAdmin &&
    `
      background: #ffffff;
      border-bottom: 1px solid #D9D9D9;

      font-size: 20px;
      position: absolute;
      width: 378px;
      height: 78px;
      display: flex;
      top: 0;
      padding: 0;
      gap: 80px;
      padding-left: 15px;
      justify-content: center;
    `}

  ${({ isAdminDetail }) =>
    isAdminDetail &&
    `
      background: #E9F3F3;
      border-bottom: 1px solid #FFFFFF;

      font-size: 20px;
      position: absolute;
      width: 378px;
      height: 78px;
      display: flex;
      top: 0;
      padding: 0;
      gap: 60px;
      padding-left: 15px;
    `}

      ${({ isJoin }) =>
    isJoin &&
    `
    background: #FFFFFF;  
    box-shadow: none;    
    border: none;
    border-bottom: 1px solid #E3E3E3;
    

    width: 378px;
    height: 78px;
    display: flex;
    top: 0;
    padding: 0;
    margin-bottom: 50px;
    gap: 100px;
    padding-left: 15px;
    font-size: 20px;
  `}

  // 레퍼런스 헤더 설정 
        ${({ isRecord }) =>
    isRecord &&
    `
    gap: 75px;
  `}

          ${({ isEdit }) =>
    isEdit &&
    `
    gap: 63px;
  `}

          ${({ isRecommend }) =>
    isRecommend &&
    `
    gap: 95px;
  `}
`;

// ✅ 헤더 (뒤로 가기 버튼 + 제목)
export const BackButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["isAdmin", "isAdminDetail"].includes(prop), // ✅ isAdminDetail 추가
})`
  font-size: 20px;
  margin-right: 10px;
  background: none;
  border: none;
  cursor: pointer;

  ${({ isAdmin }) =>
    isAdmin &&
    `
    display: none;  /* ✅ Admin에서는 버튼 숨김 */
    `}
`;
