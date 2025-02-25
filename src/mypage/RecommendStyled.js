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
  background: #e9f3f3;
`;

export const PhotoContainer = styled.div`
  width: 343px;
  height: 480px;
  border-radius: 5px;
  background: #fff;
  margin-top: 24px;
  margin-left: 25px;
`;

export const UploadWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  text-align: center;
  flex-direction: column;
  gap: 20px;
  font-size: 14px;

  svg {
  width: 100px;
  height: 60px;
  }
}

`;

export const FileInput = styled.input`
  display: none;
`;

export const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CourseName = styled.div`
  width: 85%;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 20px;
  padding: 10px;
  text-align: center;
  border: 1px solid #7adcdb;
  border-radius: 30px;
  background-color: #ffffff;
  margin-top: 30px;
`;

export const SubmitButton = styled.button`
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
  margin-top: 45px;
  margin-left: 95px;
`;
