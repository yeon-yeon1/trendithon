import styled from "styled-components";

export const Header = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isPlogging", "isAdmin", "isAdminDetail"].includes(prop),
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
`;

// ✅ 헤더 (뒤로 가기 버튼 + 제목)
export const BackButton = styled.button`
  font-size: 20px;
  margin-right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;
