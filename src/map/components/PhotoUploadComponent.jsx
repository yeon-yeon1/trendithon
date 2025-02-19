import React, { useState } from "react";
import * as P from "./PhotoStyled";
import { ReactComponent as ImgIcon } from "../../assets/Img.svg";
import { ReactComponent as CloseIcon } from "../../assets/Vclose.svg";

const PhotoUploadComponent = ({ setUploadedImages }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  // const handleImageUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   const newImagePreviews = files.map((file) => URL.createObjectURL(file));

  //   setImagePreviews((prev) => [...newImagePreviews, ...prev]);
  //   setUploadedImages((prev) => [...files, ...prev]);
  // };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...newImagePreviews, ...prev]);

    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result); // ✅ Base64로 변환
        reader.onerror = reject;
        reader.readAsDataURL(file); // ✅ Base64 인코딩
      });
    });

    Promise.all(readers)
      .then((base64Images) => {
        setUploadedImages((prev) => [...base64Images, ...prev]); // ✅ Base64 이미지 배열로 저장
      })
      .catch((err) => console.error("이미지 업로드 실패:", err));
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
      </P.UploadButton>

      <P.FileInput id="fileInput" type="file" accept="image/*" multiple onChange={handleImageUpload} />
    </P.PhotoUploadContainer>
  );
};

export default PhotoUploadComponent;
