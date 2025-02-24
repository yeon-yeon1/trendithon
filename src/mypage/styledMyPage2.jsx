import styled from "styled-components";

// 기본 레이아웃 유지
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #fff;
  min-height: 100vh;
  border: 1px solid #e3e3e3;
`;

export const BackButton = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/BackBtn.svg`, // 동적 경로 설정
})`
  cursor: pointer;
  margin-left: 16px;
`;

export const HomeIcon = styled.img`
  content: url("${process.env.PUBLIC_URL}/images/HomeIcon.svg");

  &:hover {
    content: url("${process.env.PUBLIC_URL}/images/OnHomeIcon.svg");
  }
`;

export const CommuIcon = styled.img`
  content: url("${process.env.PUBLIC_URL}/images/CommuIcon.svg");

  &:hover {
    content: url("${process.env.PUBLIC_URL}/images/OnCommuIcon.svg");
  }
`;

export const FlagIcon = styled.img`
  content: url("${process.env.PUBLIC_URL}/images/FlagIcon.svg");

  &:hover {
    content: url("${process.env.PUBLIC_URL}/images/OnFlagIcon.svg");
  }
`;

export const MyPageIcon = styled.img`
  content: url("${process.env.PUBLIC_URL}/images/OnMyPageIcon.svg");

  &:hover {
    content: url("${process.env.PUBLIC_URL}/images/OnMyPageIconHover.svg");
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

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

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

export const ProfileImage = styled.img`
  position: absolute;
  margin-top: 10px;
  width: 161px;
  height: 197.198px;
  flex-shrink: 0;
  border-radius: 20px;
`;

export const ProfileContainer = styled.div`
  width: 312px;
  height: 299px;
  flex-shrink: 0;
  border-radius: 30px 30px 0px 0px;
  background-image: url("/images/ProfileContainer.svg");
`;

export const ProfileName = styled.h2`
  color: #fff;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  margin-top: 215px;
`;

export const Points = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PointText = styled.span`
  color: white;
  // font-family: "Pretendard Variable";
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  margin-top: -55px;
  margin-left: -130px;
`;

export const RewardButton = styled.button`
  position: absolute;
  margin-top: -55px;
  margin-left: 90px;
  width: 33px;
  height: 45px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  background-image: url("/images/RewardBtn.svg");
  background-color: transparent;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const Tab = styled.div`
  color: ${({ selected }) => (selected ? "#7adcdb" : "#E3E3E3;")};
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 10px;
  cursor: pointer;
  border-bottom: ${({ selected }) => (selected ? "2px solid #7adcdb;" : "none")};
`;

export const RecordCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  width: 90%;
`;

export const RecordDate = styled.span`
  color: #aaa;
  // font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 80px;
  margin-top: 20px;
  position: absolute;
`;

export const MapContainer = styled.div`
  width: 373px;
  min-height: 395px;
  display: flex;
  flex-wrap: wrap;
  gap: 0px; /* 가로 간격은 그대로 두고 세로 간격을 줄이기 위해 gap을 0으로 설정 */
  background: #e9f3f3;
  flex-shrink: 0;
  padding: 10px;
`;

export const MapImage = styled.img`
  margin-left: 30px;
  margin-top: 20px; /* 세로 간격을 좁히기 위해 margin-top을 음수로 설정 */
  margin-bottom: 10px; /* 세로 간격을 좁히기 위해 margin-bottom을 음수로 설정 */
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 20px;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
`;

export const RecordTitle = styled.h3`
  color: #7adcdb;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  // font-family: "Pretendard Variable";
  margin-top: 240px;
  margin-left: 70px;
  position: absolute;
`;

export const BoldText = styled.span`
  font-weight: 700;
`;

// 마이페이지 추가 요소 스타일
export const AchievementSection = styled.div`
  width: 100%;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-top: 15px;
`;

export const AchievementTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

export const Badge = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const SettingsSection = styled.div`
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  margin-top: 15px;
  border: 1px solid #ddd;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

export const SettingText = styled.span`
  font-size: 16px;
`;

export const SettingButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

// Footer 스타일 유지
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

export const ExpandBtn = styled.button`
  position: absolute;
  margin-top: 18px;
  margin-left: 260px;
  width: 26px;
  height: 20px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  background-image: url("/images/ExpandBtn.svg");
  background-color: transparent;

  background-size: contain; /* 비율 유지하면서 꽉 차도록 */
  background-repeat: no-repeat; /* 반복 방지 */
  background-position: center; /* 이미지 가운데 정렬 */
`;

export const ExpandMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  width: 185px;
  height: 61px;
  background: white;
  border: 1px solid #7adcdb;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ExpandItem = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  height: 50%;
  cursor: pointer;
  text-align: center;
  color: #7adcdb;
  // font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 10px 0;
  border-bottom: 1px solid #7adcdb;
  line-height: 1.2; /* 줄 간격을 좁혀 글자가 위로 가도록 설정 */
  padding: 5px 0; /* 위쪽 패딩을 줄여서 글자가 위로 올라가도록 조정 */

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #e9f3f3;
  }
`;

export const MapItem = styled.div``;
