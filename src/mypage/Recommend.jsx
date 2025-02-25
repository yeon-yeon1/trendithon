import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as S from "./RecommendStyled.js";
import { ReactComponent as CameraIcon } from "../assets/Camera.svg";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Recommend = () => {
  const [courseName, setCourseName] = useState(""); // ✅ courseName 상태 추가
  const [verificationId, setVerificationId] = useState(null); // ✅ verificationId 상태 추가
  const [selectedImage, setSelectedImage] = useState(null); // ✅ 이미지 상태
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ GET 요청으로 courseName과 verificationId 가져오기
  useEffect(() => {
    const fetchVerificationDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/verification/${id}`);

        if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

        const data = await response.json();
        console.log("✅ 인증 데이터:", data);

        setCourseName(data.courseName || "설정된 코스 없음");
        setVerificationId(data.verificationId);
      } catch (error) {
        console.error("🚨 데이터 불러오기 실패:", error);
      }
    };

    fetchVerificationDetail();
  }, [id]);

  // ✅ 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // ✅ 파일 객체 저장
    }
  };

  // ✅ 이미지 제거 핸들러
  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  // ✅ POST 요청으로 이미지 전송
  const handleSubmit = async () => {
    if (!selectedImage || !verificationId) {
      alert("이미지를 업로드하고 다시 시도하세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("files", selectedImage); // ✅ 이미지 파일 추가

      const response = await fetch(`${API_BASE_URL}/api/verification/recommend/${verificationId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(
          `HTTP 오류! 상태 코드: ${response.status}, 메시지: ${responseData.message || "알 수 없는 오류"}`
        );
      }

      console.log("✅ 이미지 업로드 완료");
      alert("이미지가 성공적으로 업로드되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("❌ 이미지 업로드 실패:", error.message);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <S.Container>
        <Header />
        <S.CourseName>{courseName}</S.CourseName>
        <S.PhotoContainer>
          {/* ✅ 이미지 업로드 영역 */}
          {!selectedImage ? (
            <S.UploadWrapper onClick={() => document.getElementById("imageUpload").click()}>
              <CameraIcon />
              <label htmlFor="imageUpload">
                코스 추천을 위해 경로가 표시된 지도의 캡처본을 <br />
                업로드 해 주세요.
              </label>
              <S.FileInput id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
            </S.UploadWrapper>
          ) : (
            <S.ImagePreview onClick={handleImageRemove}>
              <img src={URL.createObjectURL(selectedImage)} alt="업로드된 이미지" />
            </S.ImagePreview>
          )}
          {/* ✅ 전송 버튼 */}
          <S.SubmitButton onClick={handleSubmit}>이미지 전송</S.SubmitButton>
        </S.PhotoContainer>
      </S.Container>
      <Footer />
    </>
  );
};

export default Recommend;
