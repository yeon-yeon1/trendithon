import { styled } from "styled-components";

// 배경 (고정, 필요 시 색상만 변경)
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #fff;
  min-height: 100vh;
  border: 1px solid #e3e3e3;
`;

// 뒤로 가기 버튼
export const BackButton = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/BackBtn.svg`,
})`
  cursor: pointer;
  margin-left: 16px;
`;

// 헤더
export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

// 타이틀
export const Title = styled.h1`
  margin-left: 105px;
  text-align: center;
  color: #000;
  // font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

// 회원정보 입력 폼 컨테이너
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// 라벨 스타일 (*만 색상 변경)
export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  margin-top: 20px;
  margin-left: 8px;
  color: #000;
  // font-family: "Pretendard Variable";

  &::before {
    content: "*";
    color: #7adcdb;
    margin-right: 5px;
  }
`;

// 입력 필드 스타일
export const InputField = styled.input`
  margin-top: 8px;
  padding-left: 20px;
  border-radius: 50px;
  border: 1px solid #e3e3e3;
  background: #fff;
  width: 312px;
  height: 39px;
  flex-shrink: 0;
  color: #aaa;
  // font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:focus {
    outline: none;
    border-color: #7adcdb;
  }

  &:disabled {
    background: #f5f5f5;
  }
`;

// 푸터 (=하단바, 고정)
export const Footer = styled.footer`
  position: fixed;
  transform: translate(-50%, -50%);
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

// 회원정보 수정완료 버튼
export const CompleteBtn = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/CorrectCompleteBtn.svg`,
})`
  position: fixed;
  cursor: pointer;
  margin-left: 23px;
  margin-top: 20px;
`;
