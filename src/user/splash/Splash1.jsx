import React from "react";
import * as S from "./Splash1Styled";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BG } from "../../assets/SplashR.svg";
import { ReactComponent as DogF } from "../../assets/SplashDogF.svg";
import { ReactComponent as TextIcon } from "../../assets/GuidingText.svg";
// import { ReactComponent as Human } from "../../assets/SplashHuman.svg";
import HumanImg from "../../assets/SplashHuman.png";
import { ReactComponent as Trash } from "../../assets/SplashTrash.svg";
import { ReactComponent as DogS } from "../../assets/SplashDog.svg";
import { ReactComponent as Earth } from "../../assets/SplashEarth.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/RightArrow.svg";

const Splash1 = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.TopSection>
        <S.Background>
          <BG />
        </S.Background>
        <S.DogFB>
          <DogF />
        </S.DogFB>
        <S.TextF>
          <TextIcon />
        </S.TextF>
        <S.Subtitle>멍로깅은 반려견과 함께하는 환경 친화 플로깅 활동입니다.</S.Subtitle>
      </S.TopSection>

      <S.MiddleSection>
        <S.LeftColumn>
          <S.Heading>
            <span>플로깅</span>이란 ?
          </S.Heading>
          <S.Description>
            <span>조깅</span>을 하면서 <br />
            주변에 떨어진 <span>쓰레기</span>를<br />
            <span>줍는</span> 행위를 말해요!
          </S.Description>
        </S.LeftColumn>
        <S.RightColumn>
          <Trash />
        </S.RightColumn>
      </S.MiddleSection>

      <S.ThirdSection>
        <S.LeftColumn2>
          {/* <Human style={{ transform: "scaleX(-1)" }} /> */}
          <S.Container2>
            <img src={HumanImg} alt="Human" />
          </S.Container2>
        </S.LeftColumn2>
        <S.RightColumn2>
          <S.Note>
            우리는 <span>반려견</span>과의
            <br />
            주기적인 <span>바깥활동</span>이 필요합니다.
          </S.Note>
          <S.BottomText>
            산책을 나간 김에
            <br /> 사랑하는 <S.Highlight>반려견</S.Highlight>과
            <br />
            <S.Highlight>플로깅 활동</S.Highlight>을 하고
            <br />
            <S.Highlight>혜택</S.Highlight>도 받아가세요 !!
          </S.BottomText>
        </S.RightColumn2>
      </S.ThirdSection>

      <S.Footer>
        <S.EarthBG>
          <Earth />
        </S.EarthBG>
        <S.DogS>
          <DogS />
        </S.DogS>
        <S.RightColumn3>
          <S.TextS>
            <TextIcon />
          </S.TextS>
          <S.FooterText>
            나와 반려견, 우리 모두가 함께 살아갈
            <br /> 환경을 아름답게 지켜주세요!!
          </S.FooterText>
          <S.Button onClick={() => navigate("/rs")}>
            다음
            <RightArrowIcon width="5" height="9" />
          </S.Button>
        </S.RightColumn3>
      </S.Footer>
    </S.Container>
  );
};

export default Splash1;
