import React from "react";
import * as G from "./SplashStyled";

// svg 파일들
import { ReactComponent as TextIcon } from "../assets/GuidingText.svg";
import { ReactComponent as FlagIcon } from "../assets/GreenFlagIcon.svg";
import { ReactComponent as EarthIcon } from "../assets/EarthPlanet.svg";
import { ReactComponent as iPhone13Icon } from "../assets/iPhone13.svg";
import { ReactComponent as iPhone12Icon } from "../assets/iPhone12.svg";
import { ReactComponent as HandIcon } from "../assets/GuidingHand.svg";
import { ReactComponent as CameraIcon } from "../assets/WhiteCamera.svg";
import { ReactComponent as CircleIcon } from "../assets/GreenC.svg";

const Step = ({ number, icon, text = "", isAbsolute = false }) => (
  <G.StepWrapper $isAbsolute={isAbsolute}>
    <G.StepColumn>
      <G.Step>Step</G.Step>
      <G.StepNumber>{number}</G.StepNumber>
    </G.StepColumn>
    <G.StepContent>{icon ? icon : null}</G.StepContent>
    <G.Text>{text}</G.Text>
  </G.StepWrapper>
);

const Phone = ({ icon: Icon, text }) => (
  <G.Phone>
    <Icon width="120px" height="256px" />
    <G.PhoneText className="red-text">{text}</G.PhoneText>
  </G.Phone>
);

const SplashReference = () => {
  return (
    <G.Container>
      <G.Content>
        {/* 제목 영역 */}
        <G.TitleWrapper>
          <TextIcon />
          <G.TextEP>인증 방법</G.TextEP>
        </G.TitleWrapper>

        {/* Step 1 */}
        <Step number="1" icon={<FlagIcon />} text="페이지에 들어갑니다." />

        {/* Step 2 */}
        <Step number="2" text="멍로깅 코스를 지도에 점을 찍어 저장해 주세요!" />

        {/* Earth + iPhone 영역 */}
        <G.PhoneSection>
          <EarthIcon className="earth" />
          <G.PhoneContainer>
            <Phone icon={iPhone13Icon} text="출발지 검색&설정" />
            <Phone icon={iPhone12Icon} text="코스 점 부분 근처를 지나 가면 붉은 점으로 표시 됩니다." />
          </G.PhoneContainer>
        </G.PhoneSection>

        {/* Step 3 */}
        <Step number="3" text="코스의 마지막 지점에서 각 프로깅 코스 지점의 결과물 사진을 모두 업로드 해 주세요!" />

        {/* Guide 영역 */}
        <G.GuideSection>
          <G.GuideTitle>Guide</G.GuideTitle>
          <G.GuideList>
            <G.GuideItem>
              <CircleIcon />
              쓰레기 봉투를 열어 각 지점의 플로깅 결과물이 보이게 찍고 사진을 업로드 해 주세요 !
            </G.GuideItem>
            <G.GuideItem>
              <CircleIcon />
              플로깅 지점은 두 군데 이상입니다!
            </G.GuideItem>
            <G.GuideItem>
              <CircleIcon />각 지점의 플로깅 결과물을 합친 것이 5개 미만 일 경우 인증이 거절 됩니다.
            </G.GuideItem>
            <G.GuideItem>
              <CircleIcon />각 지점의 플로깅 결과물이 5개 이상일 경우 인증 승인 후 100P지급 됩니다.
            </G.GuideItem>
            <G.GuideItem>
              <CircleIcon />
              종량제 봉투에 절반 이상 채워서 담은 플로깅 결과물은 확인 후에 추가 포인트가 차별적으로 지급될 수 있습니다.
            </G.GuideItem>
          </G.GuideList>
        </G.GuideSection>
        <G.ImageContainer>
          <G.HandIconContainer>
            <HandIcon />
          </G.HandIconContainer>
          <G.CameraContainer>
            <CameraIcon />
            <G.GuideText>
              인증사진
              <br />
              예시
            </G.GuideText>
          </G.CameraContainer>
        </G.ImageContainer>

        {/* Step 4 */}
        <Step number="4" isAbsolute />
        <G.TextContainer>
          <G.TextB>포인트가 지급됩니다.</G.TextB>
          <br />
          <G.TextS>마이페이지에서 확인 해 주세요</G.TextS>
        </G.TextContainer>
      </G.Content>
    </G.Container>
  );
};

export default SplashReference;
