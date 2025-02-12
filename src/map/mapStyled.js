import styled, { keyframes } from "styled-components";

// ✅ 전체 컨테이너 스타일
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #e9f3f3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// ✅ 지도 스타일 (푸터보다 아래로 배치)
export const MapWrapper = styled.div`
  width: 100%;
  // width: 391px;
  height: 100%;
  // border: 1px solid #ddd;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  z-index: 0; /* 🚀 푸터보다 낮게 설정 */
`;

// ✅ 상단 메시지 스타일
export const TopMessage = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  width: 60%;
  display: flex;
  justify-content: ${({ pageState }) =>
    pageState === "setStartPoint" || pageState === "verifying" ? "auto" : "center"};
  text-align: center;
  align-items: center;
  gap: 38px;

  span {
    margin-left: 15px;
    margin-top: 2px;
  }
`;

// ✅ 버튼 스타일
export const Button = styled.button`
  width: 80%;
  max-width: 300px;
  padding: 15px;

  background-color: ${({ disabled }) => (disabled ? "##678a89" : "#7adcdb")}; // ✅ 비활성화: 회색, 활성화: 초록색
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")}; // ✅ 비활성화: 클릭 불가 커서
  background-color: #7adcdb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  bottom: 130px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5dc3c1;
  }
`;

// ✅ 🔍 검색창 컨테이너 스타일
export const SearchContainer = styled.div`
  position: absolute;
  top: 39.2px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

// ✅ 🔍 검색 입력창 스타일
export const SearchInput = styled.textarea`
  width: 240px;
  height: 25px;
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  outline: none;
  resize: none;
  textarea::placeholder {
    color: #d9d9d9;
  }
`;

// ✅ 🔍 검색 버튼 스타일
export const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 10px;
  margin-left: 15px;
  background-color: #7adcdb;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
`;

/* ✅ 아래에서 위로 올라오는 애니메이션 정의 */
const slideUp = keyframes`
  from {
    transform: translateY(100%); /* 💡 처음에는 아래쪽에 위치 */
    opacity: 0; /* 💡 처음에는 투명 */
  }
  to {
    transform: translateY(0); /* 💡 원래 위치로 이동 */
    opacity: 1; /* 💡 완전 불투명 */
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  bottom: 74px;
  width: 375px;
  max-height: 427px; /* ✅ 리스트의 최대 높이 설정 */
  background: white;
  padding: 10px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border: none;
  /* ✅ 스크롤 설정 */
  overflow-y: auto; /* ✅ 세로 스크롤 허용 */
  overflow-x: hidden; /* ❌ 가로 스크롤 방지 */
  z-index: 1;
`;

// ✅ 리스트 아이템 스타일 (li → div 스타일 변경)
export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  padding: 15px;
  background: white;
  cursor: pointer;
  border-bottom: 3px solid #e9f3f3;
  animation: ${slideUp} 0.3s ease-out;

  &:hover {
    background: #eef9f9;
  }

  /* ✅ 마지막 아이템에는 border-bottom 없애기 */
  &:last-child {
    margin-bottom: 5px;
  }
`;

// ✅ 아이콘 스타일
export const IconWrapper = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

// ✅ 장소 정보 스타일 (이름 + 주소)
export const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// ✅ 장소 이름 스타일
export const PlaceName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

// ✅ 장소 주소 스타일 (서브텍스트)
export const PlaceAddress = styled.div`
  font-size: 12px;
  color: #777;
`;

// ✅ 전체 화면을 덮는 배경 (하단 바가 열릴 때 표시됨)
export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; /* ✅ 부모(Container) 내부에서만 움직이도록 변경 */
  bottom: 0;
  background: #0000001a; /* ✅ 반투명한 검은색 배경 */
  display: flex;
  align-items: flex-end; /* 하단 바와 정렬 */
`;

// ✅ 하단 바 컨테이너
export const SaveModal = styled.div`
  position: absolute; /* ✅ 부모(Container) 내부에서만 움직이도록 변경 */
  bottom: 0;
  width: 353px;
  background: white;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideUp} 0.3s ease-out;
`;

// ✅ 타이틀
export const SaveTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 5px;
`;

// ✅ textarea (크기 조정 불가능)
export const SaveTextarea = styled.textarea`
  width: 83%;
  height: 18px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  border: 1px solid #7adcdb;
  border-radius: 10px;
  resize: none; // ✅ 크기 조정 불가능
  outline: none;
`;

// ✅ 버튼 스타일
export const SaveButton = styled.button`
  width: 90%;
  padding: 12px;
  background-color: #7adcdb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 110px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5dc3c1;
  }
`;
