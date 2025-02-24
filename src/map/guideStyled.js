import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #7adcdb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
`;

export const BackIconWrapper = styled.div`
  position: absolute;
  top: 35px;
  left: 20px;
  width: 40px;
  height: 40px;

  svg {
    width: 100%;
    height: 100%;
    cursor: pointer;

    path {
      fill: white; /* ✅ 흰색으로 변경 */
    }
  }
`;

// 헤더부분
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  margin-left: 50px;
  margin-right: 0;

  svg {
    position: absolute;
    top: 2px;
  }
`;

// 헤더 텍스트 부분
export const TextEP = styled.p`
  font-size: 16px;
  color: black;
  margin: 0;
  left: 230px;
  color: #fff;
  // font-family: "Pretendard Variable";
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 45px 0 24px 180px;
`;

/* Step */
export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
  margin-top: 0;
  position: ${(props) => (props.$isAbsolute ? "absolute" : "static")};
  bottom: ${(props) => (props.$isAbsolute ? "14px" : "auto")}; /* ✅ 필요 시 위치 조정 */
`;

export const StepColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 15px;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.2) 100%);
  margin-left: 25px;
`;

//Step div
export const Step = styled.div`
  color: #6ad0cf;
  // font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  padding-top: 6px;
`;

//Step 하고 숫자
export const StepNumber = styled.div`
  color: #6ad0cf;
  // font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
`;

//깃발 아이콘
export const StepContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 41px;
    height: 37px;
    padding: 10px 2px 5px 2px;
    margin-left: 6px;
    border-radius: 12.239px 12.239px 0px 0px;
    border-top: 0.612px solid #e3e3e3;
    background: #fff;
  }
`;

//Step 옆 텍스트
export const Text = styled.p`
  color: #fff;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0;
  width: 280px;
  white-space: pre-line;
`;

export const TextContainer = styled.div`
  position: absolute;
  bottom: 21px;
  left: 84px;
`;

export const TextB = styled.span`
  color: #fff;
  // font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 800;
  margin-bottom: 0;
`;

export const TextS = styled.span`
  color: #fff;
  // font-family: "Pretendard Variable";
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  margin-top: 0;
`;

/* Phone 영역 */
export const PhoneSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;

  .earth {
    position: absolute;
    width: 100%;
    height: auto;
    z-index: 0;
    top: 80px;
  }
`;

// Phone 사진들
export const PhoneContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 10px;
  z-index: 1;
  margin-top: 0;
  gap: 15px;
`;

export const Phone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
`;

//Phone 밑 텍스트
export const PhoneText = styled.p`
  width: 130px;
  margin-top: 8px;
  margin-bottom: 0;

  &.red-text {
    color: #f9957f;
    text-align: center;
    // font-family: "Pretendard Variable";
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: 11px;
  }
`;

/* Guide */
export const GuideSection = styled.div`
  width: 217px;
  border-radius: 10.381px;
  background: rgba(233, 243, 243, 0.5);
  position: absolute;
  top: 568px;
  left: 16px;
  padding: 0;
`;

export const GuideTitle = styled.p`
  color: #6ad0cf;
  text-align: center;
  // font-family: "Pretendard Variable";
  font-size: 20.762px;
  font-style: normal;
  font-weight: 600;
  line-height: 11.419px;
  margin: 10px 0 15px 0;
`;

export const GuideList = styled.ul`
  list-style: none;
  padding: 0 28px 0 9px;
  margin: 0 0 16px;
`;

export const GuideItem = styled.li`
  font-size: 11px;
  color: black;
  margin-bottom: 13px;
  position: relative;
  padding-left: 15px;
  text-align: left;
  align-items: center;

  svg {
    width: 9px;
    height: 9px;
    position: absolute;
    left: 0;
    top: 2px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

//손 사진
export const HandIconContainer = styled.div`
  position: absolute;
  // top: 480px;
  bottom: 0;
  align-items: center;
`;

//카메라 사진
export const CameraContainer = styled.div`
  position: absolute;
  right: 25px;
  bottom: 250px;
  svg {
    margin-left: 2px;
  }
`;

export const GuideText = styled.p`
  text-align: center;
  color: #f9957f;
  // font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  margin-top: 5px;
`;
