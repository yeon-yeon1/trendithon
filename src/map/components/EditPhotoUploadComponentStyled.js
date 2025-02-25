import styled from "styled-components";

export const PhotoUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 90px;
  margin-top: 16px;
`;

export const ImagePreviewGrid = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  padding: 8px 0;
  margin-left: 20px;
  width: 71%;
  border-radius: 10px;
  margin-bottom: 0;
`;

export const ImagePreview = styled.div`
  width: 79px;
  height: 63px;
  border-radius: 17px;
  background-size: cover;
  background-position: center;
  position: relative;
  flex-shrink: 0;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: 1px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
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

export const FileInput = styled.input`
  display: none;
`;
