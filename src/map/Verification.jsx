import React, { useEffect, useState } from "react";
import * as V from "../map/VerificationStyled.js";
import { useLocation, useNavigate } from "react-router-dom";
import MapContainer from "./components/MapContainer.jsx"; //지도
import Footer from "../components/Footer"; //푸터
import Header from "../components/Header"; //헤더
import DatePickerComponent from "./components/DatePickerComponent.jsx"; //날짜
import PhotoUploadComponent from "./components/PhotoUploadComponent.jsx"; //인증 사진
import ThankYouModal from "./components/ThankYouModal"; // 감사 모달
import { useAuth } from "../context/AuthContext.js"; // 사용자 정보 (로그인 아이디 및 닉네임, 반려견 이름)

// svg 파일
import { ReactComponent as RightArrowIcon } from "../assets/RightArrow.svg";

const TMAP_KEY = process.env.REACT_APP_TMAP_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Verification = () => {
  const { user } = useAuth();
  console.log("🔍 현재 로그인한 사용자:", user); // 👉 확인용 로그 추가
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ "감사합니다" 모달 상태 추가
  const [showThankYou, setShowThankYou] = useState(false);

  // ✅ 가이드 확인 버튼 클릭 시 랜딩 페이지 이동
  const handleGuideClick = () => {
    // navigate("/guide"); // ✅ 가이드 페이지 URL로 이동
    navigate("/guide", { state: { from: "verification" } });
  };

  // ✅ 이전 페이지에서 전달된 데이터 받기 (마킹한 좌표 및 경로 데이터)
  const { courseName, path: originalPath } = location.state || {};

  // ✅ 전체 마킹한 좌표를 사용하도록 수정
  const [path, setPath] = useState(originalPath || []);
  console.log("🔍 전달된 경로 데이터:", path);

  const [selectedDate, setSelectedDate] = useState(new Date()); // ✅ 오늘 날짜 기본값
  const [routePath, setRoutePath] = useState([]); // ✅ Tmap 길찾기 경로 저장
  const [markers, setMarkers] = useState([]); // ✅ 숫자 마커 저장
  // const [uploadedImage, setUploadedImage] = useState(null); // ✅ 업로드된 이미지 저장
  const [uploadedImages, setUploadedImages] = useState([]); // ✅ 배열로 변경

  // ✅ 1. Tmap API를 사용하여 도보 길찾기 경로 가져오기
  useEffect(() => {
    if (!path || path.length < 2 || !TMAP_KEY) return; // 경로가 없거나 2개 미만이면 실행 안함

    const getWalkingRoute = async () => {
      console.log("🚀 Tmap 도보 길찾기 API 호출 시작!");

      const startCoord = path[0]; // 출발지
      const goalCoord = path[path.length - 1]; // 도착지
      const viaPoints = path.slice(1, -1).map((point, index) => ({
        viaX: point.lng.toString(),
        viaY: point.lat.toString(),
        viaPointId: `via${index + 1}`,
      }));

      const url = `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&appKey=${TMAP_KEY}`;

      const requestBody = {
        startX: startCoord.lng.toString(),
        startY: startCoord.lat.toString(),
        endX: goalCoord.lng.toString(),
        endY: goalCoord.lat.toString(),
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: "출발지",
        endName: "도착지",
        viaPoints, // ✅ 중간 마킹 지점 추가
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) throw new Error("🚨 Tmap 도보 길찾기 API 요청 실패");

        const data = await response.json();
        console.log("🗺️ Tmap 도보 경로 응답 데이터:", data);

        if (data.features?.length) {
          const newRoutePath = data.features
            .filter((feature) => feature.geometry.type === "LineString")
            .flatMap((feature) =>
              feature.geometry.coordinates.map(([lng, lat]) => ({
                lat,
                lng,
              }))
            );

          setRoutePath(newRoutePath); // ✅ Tmap 길찾기 경로 저장
        } else {
          console.warn("⚠️ 도보 경로 데이터가 없습니다!");
        }
      } catch (error) {
        console.error("🚨 Tmap 도보 길찾기 실패:", error);
      }
    };

    getWalkingRoute();
  }, [path]);

  // ✅ 날짜를 YYYY-MM-DD 형식으로 변환하는 함수 (한국 시간 기준)
  const formatDate = (date) => {
    return date
      .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
      .replace(/\. /g, "-") // ✅ '.'을 '-'로 변경
      .replace(".", ""); // ✅ 마지막 점 제거
  };

  const handleVerificationSubmit = async () => {
    const parsedUser = typeof user === "string" ? JSON.parse(user) : user;

    if (!parsedUser?.userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const verificationData = {
      userId: parsedUser.userId,
      courseName: courseName || "설정된 코스 없음",
      date: formatDate(selectedDate),
      path: path,
    };

    const formData = new FormData();

    // ✅ JSON을 Blob으로 추가 (application/json 명시)
    formData.append("verification", new Blob([JSON.stringify(verificationData)], { type: "application/json" }));

    // ✅ 이미지 파일 추가
    // ✅ Base64 이미지를 File로 변환 후 추가
    const base64ToFile = (base64String, fileName) => {
      const arr = base64String.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
    };

    uploadedImages.forEach((base64, index) => {
      const file = base64ToFile(base64, `image_${index}.png`);
      formData.append("files", file);
    });

    // ✅ FormData 내용 출력
    console.log("🔍 FormData 내용:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/verification`, {
        method: "POST",
        body: formData, // ✅ Content-Type 자동 처리
      });

      const responseText = await response.text(); // ✅ JSON 대신 text로 받기
      console.log("✅ 인증 전송 성공:", responseText);
      setShowThankYou(true);
    } catch (error) {
      console.error("🚨 인증 전송 실패:", error);
      alert("인증 전송에 실패했습니다.");
    }
  };

  // ✅ 모달 닫히면 홈으로 이동
  const handleModalClose = () => {
    navigate("/home");
  };

  // ✅ 2. 숫자 마커 저장 (모든 마킹 지점을 반영)
  useEffect(() => {
    if (!path || path.length === 0) return;

    const numberedMarkers = path.map((point, index) => ({
      lat: point.lat,
      lng: point.lng,
      number: index + 1, // ✅ 1, 2, 3, 4... 순서대로 마커 생성
    }));

    setMarkers(numberedMarkers);
  }, [path]);

  return (
    <V.Container>
      {/* // ✅ Header 컴포넌트 사용 */}
      <Header />

      {/* 📅 플로깅 일자 (달력 아이콘 클릭 시 달력 팝업) */}
      <DatePickerComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {/* 🏃‍♂️ 플로깅 코스 이름 */}
      <V.CourseName>{courseName || "설정된 코스 없음"}</V.CourseName>

      {/* 🗺️ 지도 (Tmap API로 가져온 길찾기 경로 반영 + 마킹한 순서 반영) */}
      <V.MapWrapper>
        <MapContainer initialPath={routePath.length > 0 ? routePath : path} markers={markers} isVerification={true} />
      </V.MapWrapper>

      {/* ℹ️ 가이드라인 + 가이드 확인 버튼 */}
      <V.GuidelineWrapper>
        <V.Guideline>
          종량제 봉투와 플로깅 결과물이 잘 보일 수 있도록
          <br />
          사진을 업로드 해 주세요.
        </V.Guideline>
        <V.GuideButton onClick={handleGuideClick}>
          가이드 확인 <RightArrowIcon width="5" height="9" />
        </V.GuideButton>
      </V.GuidelineWrapper>

      {/* 📸 사진 업로드 영역 */}
      <PhotoUploadComponent setUploadedImages={setUploadedImages} />

      {/* ✅ 인증하기 버튼 */}
      <V.VerifyButton onClick={handleVerificationSubmit}>인증하기</V.VerifyButton>

      {/* ✅ 푸터 추가 */}
      <Footer />

      {/* ✅ "감사합니다" 모달 표시 */}
      {showThankYou && <ThankYouModal onClose={handleModalClose} />}
    </V.Container>
  );
};

export default Verification;
//
