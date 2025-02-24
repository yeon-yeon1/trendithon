import { styled } from "styled-components";

// 배경 (고정, 필요 시 색상만 변경)
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #e9f3f3;
  min-height: 100vh; /* 화면 크기에 맞게 자동 조절 */
  border: 1px solid #e3e3e3; /* 화면 구분선, 추후 삭제해도 됨 */
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

export const Title = styled.h1`
  margin-left: 100px;
  text-align: center;
  color: #000;
  // font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const BackButton = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/BackBtn.svg`, // 동적 경로 설정
})`
  cursor: pointer;
  margin-left: 16px;
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

export const CalendarBox = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/CalendarBox.svg`,
})`
  margin-left: 23px;
  margin-top: 40px;
`;

export const DateText = styled.div`
  color: #000;
  // font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 160.5%; /* 19.26px */
  margin-left: 45px;
  margin-top: -27px;
`;

export const TitleBox = styled.div`
  width: 359px;
  height: 41px;
  flex-shrink: 0;
  border-radius: 30px;
  border: 1px solid #7adcdb;
  background: #fff;
  margin-left: 16px;
  margin-top: 15px;
`;

export const TitleText = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  // font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  margin-top: -30px;
`;

export const LocationBox = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/LocationBox.svg`,
})`
  margin-left: 18px;
  margin-top: 25px;
`;

export const LocationText = styled.div`
  color: #fff;
  text-align: left;
  // font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: -28px;
  position: relative;
  z-index: 9999;
  margin-left: 55px;
`;

export const DetailMap = styled.div`
  width: 359px;
  height: 389px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  margin-left: 17px;
  margin-top: 20px;
  overflow: hidden; /* 넘치는 이미지 숨김 */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 비율 유지하면서 꽉 차게 */
  }
`;
