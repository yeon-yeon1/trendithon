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
  overflow: hidden;
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
export const Icon = styled.img`
  width: 56px;
  height: 55px;
  margin-bottom: 5px;

  &:hover {
    content: url(${(props) => props.hoverSrc});
  }
`;

// 아이콘 컴포넌트 (고정, 개별 아이콘)
export const HomeIcon = (props) => (
  <Icon {...props} src="/images/OnHomeIcon.svg" alt="Home" />
);
export const CommuIcon = (props) => (
  <Icon
    {...props}
    src="/images/CommuIcon.svg"
    alt="Community"
    hoverSrc="/images/OnCommuIcon.svg"
  />
);
export const FlagIcon = (props) => (
  <Icon
    {...props}
    src="/images/FlagIcon.svg"
    alt="Plogging"
    hoverSrc="/images/OnFlagIcon.svg"
  />
);
export const MyPageIcon = (props) => (
  <Icon
    {...props}
    src="/images/MyPageIcon.svg"
    alt="My Page"
    hoverSrc="/images/OnMyPageIcon.svg"
  />
);

// 이웃 멍로깅 배경
export const CarouselContainer = styled.div`
  width: 393px;
  height: 293px;
  flex-shrink: 0;
  background: #e9f3f3;
`;

// 이웃 멍로깅 문구
export const Text = styled.div`
  color: #000;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 20px;
  padding-top: 20px;
`;

export const BoldText = styled.span`
  font-weight: 700;
`;

// 캐러셀 컨테이너
export const CarouselWrapper = styled.div`
  padding: 0 20px;
`;

// 개별 카드 스타일
export const DogCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  outline: none;
  cursor: pointer;
`;

// 강아지 이미지 스타일
export const DogImage = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// 지역 이름 텍스트
export const RegionText = styled.p`
  color: #aaa;
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

// 배너
export const Banner = styled.div`
  width: 430px;
  height: 254px;
  flex-shrink: 0;
  background-image: url("/images/HomeBanner.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
