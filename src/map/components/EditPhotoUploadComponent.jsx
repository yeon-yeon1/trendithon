import React, { useState, useEffect } from "react";
import * as P from "./EditPhotoUploadComponentStyled";
import { ReactComponent as ImgIcon } from "../../assets/Img.svg";
import { ReactComponent as CloseIcon } from "../../assets/Vclose.svg";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EditPhotoUploadComponent = ({ uploadedImages = [], setUploadedImages }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  // ✅ 기존 이미지 받아와서 미리보기 설정
  useEffect(() => {
    setImagePreviews(uploadedImages.map((image) => (typeof image === "string" ? image : URL.createObjectURL(image))));
  }, [uploadedImages]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...newImagePreviews, ...prev]);
    setUploadedImages((prev) => [...files, ...prev]); // ✅ File 객체로 저장
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <P.PhotoUploadContainer>
      <P.ImagePreviewGrid>
        {imagePreviews.map((preview, index) => (
          <P.ImagePreview key={index} style={{ backgroundImage: `url(${preview})` }}>
            <P.RemoveButton onClick={() => handleRemoveImage(index)}>
              <CloseIcon width="14" height="14" />
            </P.RemoveButton>
          </P.ImagePreview>
        ))}
      </P.ImagePreviewGrid>

      <P.UploadButton onClick={() => document.getElementById("fileInput").click()}>
        <ImgIcon width="23" height="22" />
        <p>인증사진</p>
      </P.UploadButton>

      <P.FileInput id="fileInput" type="file" accept="image/*" multiple onChange={handleImageUpload} />
    </P.PhotoUploadContainer>
  );
};

export default EditPhotoUploadComponent;
