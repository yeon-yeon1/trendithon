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
  padding-top: 85px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  padding: 15px 25px 5px 25px;
  display: block;
  span {
    color: #7adcdb;
  }
`;

export const Data = styled.div`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background: #f9f9f9;
  margin: 0 20px;
`;

export const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: 15px;
  margin-left: 25px;
  padding: 5px 5px;
  border: 1px solid #7adcdb;
  border-radius: 10px;
  width: 176px;
  height: 25px;
  align-items: center;
  justify-content: center;
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

export const MapContainer = styled.div`
  height: 230px;
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
  height: 240px;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  margin: 10px 25px 0 25px;
`;

export const ImagePreview = styled.img`
  width: 200px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  scroll-snap-align: start;
  flex-shrink: 0;
`;
