import styled from "styled-components";

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

// ✅ DOM으로 전달될 불필요한 props(`hoverSrc`)를 필터링 (hoverSrc 경고 문구가 계속 떠서 수정)
const Icon = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "hoverSrc" && prop !== "src",
})`
  width: 56px;
  height: 55px;
  margin-bottom: 5px;

  /* 기본 이미지 */
  content: ${(props) => `url(${props.src})`};

  /* 호버 시 이미지 */
  &:hover {
    content: ${(props) => (props.hoverSrc ? `url(${props.hoverSrc})` : `url(${props.src})`)};
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

// 아이콘 활성 컴포넌트 (고정, 개별 아이콘)
export const HomeIconActive = (props) => <Icon {...props} src="/images/OnHomeIcon.svg" alt="Home" />;
export const CommuIconActive = (props) => <Icon {...props} src="/images/OnCommuIcon.svg" alt="Community" />;
export const FlagIconActive = (props) => <Icon {...props} src="/images/OnFlagIcon.svg" alt="Plogging" />;
export const MyPageIconActive = (props) => <Icon {...props} src="/images/OnMyPageIcon.svg" alt="My Page" />;
