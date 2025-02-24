// Splash1Styled.js
import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;

  svg {
    height: 237px;
  }
`;

export const DogFB = styled.div`
  position: absolute;
  top: 0;
  left: -80px;
  width: 100%;
`;

export const TextF = styled.div`
  position: absolute;
  top: 11px;
  right: 52px;
  width: 40%;
`;

export const Subtitle = styled.p`
  color: #6ad0cf;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 44%;
  margin-left: 200px;
  margin-top: 90px;
`;

export const LeftColumn = styled.div`
  margin-left: 26px;
  margin-top: 16px;

  h2 {
    color: #6ad0cf;
    // font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  h2 span {
    color: #6ad0cf;
    // font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
  }

  p {
    color: #6ad0cf;
    // font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 50px;
  }

  p span {
    color: #6ad0cf;
    // font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const RightColumn = styled.div`
  position: absolute;
  z-index: -2;
  right: 0;
  // top: 162px;
  top: 171px;
`;

//3섹션

export const Container2 = styled.div``;

export const LeftColumn2 = styled.div`
  // position: relative;
  position: absolute;
  // top: 418px;
  top: 458px;
  overflow: hidden;
  opacity: 75%;

  img {
    position: relative;
    width: 260px;
    height: 236px;
    left: 0px;
    z-index: -2;
  }
`;

export const RightColumn2 = styled.div`
  position: absolute;
  right: 0;
`;

export const Note = styled.p`
// margin-top: 123px;
margin-top: 169px;

  color: #6ad0cf;
  text-align: right;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 17px;

  span {
  color: #6ad0cf;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

}
`;

export const BottomText = styled.p`
  margin-top: 70px;
  text-align: left;

  color: #6ad0cf;
  text-align: left;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 71px;

  span {
    color: #6ad0cf;
    // font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const ThirdSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TopSection = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

export const MiddleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

//4 섹션
export const Footer = styled.div`
  background: linear-gradient(162deg, #d1ffd8 16.77%, #7adcdb 64.85%);
  position: absolute;
  bottom: 0;
  height: 191px;
  // z-index: -2;
  z-index: 1;
  width: 393px;
`;

export const EarthBG = styled.div`
  position: absolute;
  bottom: -5px;
  // z-index: -1;
  z-index: -1;
`;

export const DogS = styled.div`
  margin-left: 35px;
  z-index: 2;
`;

export const RightColumn3 = styled.div`
  position: absolute;
  right: 0;
`;

export const TextS = styled.div`
  position: absolute;
  bottom: 50px;
  right: 19px;

  svg {
    width: 121px;
  }
`;

export const FooterText = styled.p`
  color: #fff;
  text-align: center;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  position: absolute;
  bottom: 38px;
  width: 300px;
  right: -23px;
`;

export const Title = styled.h1`
  // font-size: 2rem;
  // font-weight: bold;
`;

export const Heading = styled.h2`
  // font-size: 1.8rem;
  // font-weight: bold;
`;

export const Description = styled.p`
  // font-size: 1.2rem;
`;

export const Highlight = styled.span`
  color: #6ad0cf;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Button = styled.button`
  cursor: pointer;
  pointer-events: auto;
  width: 58px;
  height: 23px;
  color: #6ad0cf;
  font-size: 11px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.31) 67.67%, rgba(122, 220, 219, 0.31) 100%);

  position: absolute;
  bottom: 9px;
  right: 26px;

  svg {
    position: absolute;
    top: 7px;
    right: 5px;
  }
`;
