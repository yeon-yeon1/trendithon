import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  background: #e9f3f3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  padding-top: 15px;
`;

export const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 25px;
  padding: 5px 5px;
  border: 1px solid #7adcdb;
  border-radius: 10px;
  width: 176px;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled.div`
  position: absolute;
  top: 93px;
  right: 28px;
`;

export const DateBadge = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const courseName = styled.div`
  width: 85%;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 20px 0 20px;
  padding: 10px;
  text-align: center;
  border: 1px solid #7adcdb;
  border-radius: 30px;
  background-color: #ffffff;
`;

export const InputWrapper = styled.div`
  width: 85%;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 20px 0 20px;
  padding: 10px;
  text-align: center;
  border: 1px solid #7adcdb;
  border-radius: 30px;
  background-color: #ffffff;
`;

export const Input = styled.input`
  width: 85%;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 20px 0 20px;
  padding: 10px;
  text-align: center;
  border: 1px solid #7adcdb;
  border-radius: 30px;
  background-color: #ffffff;
`;

export const MapContainer = styled.div`
  height: 400px;
  background: #ddd;
  text-align: center;
  line-height: 300px;
  border-radius: 5px;
  margin: 10px 25px 0 25px;
`;

export const ButtonContainer = styled.div`
  margin: 20px 25px;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
  width: 165px;
  gap: 10px;

  ${(props) =>
    props.reject &&
    `
      background: #F9957F;
    `}

  ${(props) =>
    props.accept &&
    `
      background: #7ADCDB;
    `}
`;
export const ModalImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullImage = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

export const ImageCarousel = styled.div`
  display: flex;
  width: 264px;
  height: 63px;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  margin: 10px 25px 0 25px;

  img {
    width: 79px;
  }
`;

export const ImagePreview = styled.img`
  width: 200px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  scroll-snap-align: start;
  flex-shrink: 0;
`;

// ✅ 인증하기 버튼
export const RecomendBtn = styled.button`
  width: 154.154px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 46.154px;
  background: var(--gradient, linear-gradient(103deg, #d1ffd8 0.12%, #7adcdb 99.88%));
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  margin-top: 0;
  margin-left: 120px;
  position: absolute;
  bottom: 54px;
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

// ✅ 가이드라인 div
export const GuidelineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  background-color: #7adcdb;
  border-radius: 5px;
  margin: 0 20px;
  margin-top: 15px;
  padding: 13px 0;
`;

// ✅ 가이드라인 텍스트
export const Guideline = styled.p`
  font-size: 14px;
  color: #ffffff;
  text-align: center;
`;

export const UploadButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(103deg, #d1ffd8 0.12%, #7adcdb 99.88%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
position: absolute;
bottom: 147px;
left: 305px;
}

  p {
    color: #fff;
    text-align: center;
    // font-family: "Pretendard Variable";
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 1px 0;
  }
`;
