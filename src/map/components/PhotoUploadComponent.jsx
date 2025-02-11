import React, { useState } from "react";
import * as V from "../VerificationStyled.js";
import { ReactComponent as CameraIcon } from "../../assets/Camera.svg"; // 📸 카메라 아이콘 추가

const PhotoUploadComponent = ({ setUploadedImage }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setUploadedImage(e.target.result); // ✅ Verification에 이미지 전달
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <V.PhotoUpload
      onClick={() => document.getElementById("fileInput").click()}
      style={{
        backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!imagePreview && (
        <>
          <V.UploadIcon>
            <CameraIcon width="45" height="41" />
          </V.UploadIcon>
          <V.UploadText>플로깅 인증 사진을 업로드 해 주세요.</V.UploadText>
        </>
      )}
      <V.FileInput id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} />
    </V.PhotoUpload>
  );
};

export default PhotoUploadComponent;
