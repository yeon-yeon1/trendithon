import { styled } from "styled-components";

// 배경 (고정, 필요 시 색상만 변경)
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #fff;
  min-height: 100vh; /* 화면 크기에 맞게 자동 조절 */
  border: 1px solid #e3e3e3; /* 화면 구분선, 추후 삭제해도 됨 */
`;

// 푸터 (=하단바, 고정)
export const Footer = styled.footer`
  position: fixed;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  left: 50%;
  width: 393px;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  top: 95%;
  z-index: 2; // ✅ 검색 모달창 때문에 추가(mapStyled.js)
`;

// 네비게이션 아이템 (고정)
export const NavItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  user-select: none;
`;

// 아이콘 (고정)
// export const Icon = styled.img`
//   width: 56px;
//   height: 55px;
//   margin-bottom: 5px;

//   &:hover {
//     content: url(${(props) => props.hoverSrc});
//   }
// `;

// ✅ DOM으로 전달될 불필요한 props(`hoverSrc`)를 필터링 (hoverSrc 경고 문구가 계속 떠서 수정)
const Icon = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "hoverSrc",
})`
  width: 56px;
  height: 55px;
  margin-bottom: 5px;

  &:hover {
    content: url(${(props) => props.hoverSrc});
  }
`;

// 아이콘 컴포넌트 (고정, 개별 아이콘)
export const HomeIcon = (props) => (
  <Icon {...props} src="/images/HomeIcon.svg" alt="Home" hoverSrc="/images/OnHomeIcon.svg" />
);
export const CommuIcon = (props) => (
  <Icon {...props} src="/images/CommuIcon.svg" alt="Community" hoverSrc="/images/OnCommuIcon.svg" />
);
export const FlagIcon = (props) => (
  <Icon {...props} src="/images/FlagIcon.svg" alt="Plogging" hoverSrc="/images/OnFlagIcon.svg" />
);
export const MyPageIcon = (props) => (
  <Icon {...props} src="/images/MyPageIcon.svg" alt="My Page" hoverSrc="/images/OnMyPageIcon.svg" />
);
