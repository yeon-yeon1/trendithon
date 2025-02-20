import styled from "styled-components";

// ✅ 전체 감싸는 컨테이너
export const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 185px;
  margin-top: 15px;
  border: 1px solid #7adcdb;
  border-radius: 10px;
  width: 176px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

// ✅ 플로깅 일자 뱃지
export const DateBadge = styled.div`
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 7px;
`;

// ✅ 팝업 달력 컨테이너
export const DatePickerPopup = styled.div`
  position: absolute;
  top: 120px;
  left: 110px;
  z-index: 10;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  padding: 10px;
`;
