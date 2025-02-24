import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MapContainer from "./components/MapContainer"; // ✅ 지도 컴포넌트 임포트
import * as S from "./AdminDetailStyled"; // ✅ 스타일 임포트
import { ReactComponent as CalendarIcon } from "../assets/Calendar.svg";
import { useAuth } from "../context/AuthContext";

const TMAP_KEY = process.env.REACT_APP_TMAP_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AdminDetail = () => {
  const { user } = useAuth(); // ✅ 사용자 정보 가져오기
  const { id } = useParams();
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 추가
  const [uploadedImages, setUploadedImages] = useState([]); // ✅ 이미지 배열 상태
  const [selectedImage, setSelectedImage] = useState(null); // 클릭한 이미지

  // ✅ 플로깅 ID 기반으로 데이터 조회 (API 요청)
  useEffect(() => {
    const fetchVerificationDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/verification/${id}`);

        if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

        const data = await response.json();
        console.log("✅ 인증 데이터:", data);

        setVerificationData(data);
        setRoutePath(data.path || []);

        // ✅ 이미지 배열 업데이트
        if (Array.isArray(data.uploadedImages)) {
          setUploadedImages(data.uploadedImages);
          console.log("✅ 이미지 배열 확인:", data.uploadedImages); // ✅ 이미지 배열 바로 출력
        } else {
          setUploadedImages([]);
          console.warn("⚠️ 이미지 배열이 비어 있습니다.");
        }
      } catch (error) {
        console.error("🚨 데이터 불러오기 실패:", error);
      }
    };

    fetchVerificationDetail();
  }, [id]);

  // 👇🏻 여기서부터
  const [markers, setMarkers] = useState([]); // ✅ 지도에 표시할 마커
  const [routePath, setRoutePath] = useState([]); // ✅ 지도에 표시할 경로

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("verificationData")) || [];
    const selectedData = storedData[id];

    if (selectedData) {
      setVerificationData(selectedData);
      setRoutePath(selectedData.path || []);
    }
  }, [id]);

  // ✅ 마커 설정 (verificationData.path 기준)
  useEffect(() => {
    if (!verificationData || !verificationData.path) return;

    const numberedMarkers = verificationData.path.map((point, index) => ({
      lat: point.lat,
      lng: point.lng,
      number: index + 1, // ✅ 1, 2, 3, 4... 순서대로 마커 생성
    }));

    setMarkers(numberedMarkers);
  }, [verificationData]);

  // ✅ Tmap 도보 길찾기 API를 사용하여 경로 가져오기
  useEffect(() => {
    if (!verificationData || !verificationData.path || verificationData.path.length < 2 || !TMAP_KEY) return;

    const getWalkingRoute = async () => {
      console.log("🚀 Tmap 도보 길찾기 API 호출 시작!");

      const startCoord = verificationData.path[0]; // 출발지
      const goalCoord = verificationData.path[verificationData.path.length - 1]; // 도착지
      const viaPoints = verificationData.path.slice(1, -1).map((point, index) => ({
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
          headers: { "Content-Type": "application/json" },
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
  }, [verificationData]);

  // 👆🏻 여기까지 복붙해서 (필요시-변수 이름이랑 의존 배열 값 변경하면) 지도 불러오기 가능
  // 지도 컴포넌트도 임포트 해야 함
  // + 157번 줄 가보기

  // ✅ 인증 승인 함수 (PENDING → APPROVED + 자동 삭제)
  const handleAccept = async () => {
    try {
      const numericId = Number(id); // ✅ 문자열을 숫자로 변환
      console.log("ID 변환 결과:", typeof numericId, numericId); // 확인용 로그

      const response = await fetch(`${API_BASE_URL}/api/admin/verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verificationId: numericId, // ✅ 숫자 타입으로 전달
          adminUserId: "root",
          status: "APPROVED",
        }),
      });

      if (!response.ok) throw new Error("인증 승인 실패");

      alert("인증이 승인되었습니다!");

      // const deleteResponse = await fetch(`${API_BASE_URL}/api/admin/verification`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     verificationId: numericId, // ✅ 숫자 타입으로 전달
      //     adminUserId: "root",
      //   }),
      // });

      // if (!deleteResponse.ok) throw new Error("인증 삭제 실패");

      // alert("승인된 인증이 자동 삭제되었습니다!");
      navigate("/admin");
    } catch (error) {
      console.error("🚨 승인 및 삭제 실패:", error);
      alert("인증 승인 및 삭제에 실패했습니다.");
    }
  };

  // ✅ 인증 거절 함수 (PENDING → REJECTED)
  const handleReject = async () => {
    try {
      const numericId = Number(id); // ✅ 문자열을 숫자로 변환
      console.log("ID 변환 결과:", typeof numericId, numericId); // 확인용 로그
      const response = await fetch(`${API_BASE_URL}/api/admin/verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // verificationId: Number(id),
          verificationId: numericId, // ✅ 숫자 타입으로 전달
          adminUserId: "root",
          status: "REJECTED",
          // status: "PENDING",
        }),
      });

      if (!response.ok) throw new Error("인증 거절 실패");

      alert("인증이 거절되었습니다!");
      navigate("/admin");
    } catch (error) {
      console.error("🚨 인증 거절 실패:", error);
      alert("인증 거절에 실패했습니다.");
    }
  };

  // ✅ 로딩 처리
  if (!verificationData) {
    return <p>데이터를 불러오는 중...</p>;
  }

  return (
    <>
      <S.Container>
        <Header />
        <S.Container2>
          <S.Label>
            <span>*</span> 아이디
          </S.Label>
          {/* <S.Data>아이디 정보가 뜹니다</S.Data> */}
          <S.Data>{verificationData.userId}</S.Data>

          <S.Label>
            <span>*</span> 반려견 이름
          </S.Label>
          {/* <S.Data>반려견 정보가 뜹니다</S.Data> */}
          <S.Data>{verificationData.petName || "정보 없음"}</S.Data>

          <S.Label>
            <span>*</span> 멍로깅 인증
          </S.Label>

          <S.DatePickerWrapper>
            <S.DateBadge>
              플로깅 일자 {verificationData.date} <CalendarIcon width="12.5" height="12.5" />
            </S.DateBadge>
          </S.DatePickerWrapper>

          <S.courseName>{verificationData.courseName}</S.courseName>

          <S.MapContainer>
            {/* 👇🏻지도 컴포넌트는 이런식으로 넣으면 적용됨 */}
            <MapContainer
              initialPath={routePath.length > 0 ? routePath : verificationData?.path}
              markers={markers}
              isVerification={true}
            />
          </S.MapContainer>

          {/* ✅ 이미지가 여러 개일 경우 */}
          {uploadedImages.length > 0 ? (
            <S.ImageCarousel>
              {uploadedImages.map((image, index) => (
                <S.ImagePreview
                  key={index}
                  src={image}
                  alt={`플로깅 인증 ${index + 1}`}
                  onClick={() => {
                    setSelectedImage(image);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </S.ImageCarousel>
          ) : (
            <p style={{ marginLeft: "110px", marginTop: "40px" }}>플로깅 인증 사진이 없습니다.</p>
          )}

          <S.ButtonContainer>
            <S.Button reject onClick={handleReject}>
              인증 거절
            </S.Button>
            <S.Button accept onClick={handleAccept}>
              인증 수락
            </S.Button>
          </S.ButtonContainer>
        </S.Container2>
      </S.Container>

      {/* ✅ 모달 창 */}
      {isModalOpen && (
        <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
          {/* ✅ 클릭하면 닫힘 */}
          <S.ModalContent>
            <S.ModalImage src={selectedImage} alt="확대된 이미지" />
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default AdminDetail;
