import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MapContainer from "../map/components/MapContainer"; // ✅ 지도 컴포넌트 임포트
import * as S from "./MyRecordStyled"; // ✅ 스타일 임포트
import { ReactComponent as CalendarIcon } from "../assets/Calendar.svg";
import { ReactComponent as MenuIcon } from "../assets/GreenExpandBtn.svg";
import { useAuth } from "../context/AuthContext";
// svg 파일
import { ReactComponent as ImgIcon } from "../assets/Img.svg";

const TMAP_KEY = process.env.REACT_APP_TMAP_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MyRecord = () => {
  const { user } = useAuth(); // ✅ 사용자 정보 가져오기
  const { id } = useParams();
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 추가
  const [uploadedImages, setUploadedImages] = useState([]); // ✅ 이미지 배열 상태
  const [selectedImage, setSelectedImage] = useState(null); // 클릭한 이미지
  const [isExpanded, setIsExpanded] = useState(false);
  const [showImages, setShowImages] = useState(false);

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

  // ✅ 로딩 처리
  if (!verificationData) {
    return <p>데이터를 불러오는 중...</p>;
  }

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // ✅ DELETE 요청 함수
  const handleDelete = async () => {
    if (!verificationData || !verificationData.userId || !verificationData.verificationId) {
      alert("삭제할 데이터를 찾을 수 없습니다.");
      return;
    }

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/mypage/logs?userId=${verificationData.userId}&verificationId=${verificationData.verificationId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(
            `HTTP 오류! 상태 코드: ${response.status}, 메시지: ${responseData.message || "알 수 없는 오류"}`
          );
        }

        console.log("✅ 삭제 완료");
        alert("삭제가 완료되었습니다.");
        navigate("/mypage"); // ✅ 삭제 후 마이페이지로 이동 (원하는 페이지로 변경 가능)
      } catch (error) {
        console.error("❌ 삭제 실패:", error.message);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <S.Container onClick={() => isExpanded && setIsExpanded(false)}>
        <Header />
        <S.Container2>
          <S.DatePickerWrapper>
            <S.DateBadge>
              플로깅 일자 {verificationData.date} <CalendarIcon width="12.5" height="12.5" />
            </S.DateBadge>
          </S.DatePickerWrapper>
          <S.Menu>
            <MenuIcon
              onClick={(e) => {
                e.stopPropagation(); // ✅ 메뉴 아이콘 클릭 시 메뉴가 닫히지 않게 함
                setIsExpanded((prev) => !prev);
              }}
            />
          </S.Menu>

          {isExpanded && (
            <S.ExpandMenu>
              <S.ExpandItem onClick={handleDelete}>삭제하기</S.ExpandItem>
              <S.ExpandItem onClick={() => navigate(`/record/${verificationData.verificationId}/edit`)}>
                수정하기
              </S.ExpandItem>
            </S.ExpandMenu>
          )}

          <S.courseName>{verificationData.courseName}</S.courseName>

          <S.MapContainer>
            {/* 👇🏻지도 컴포넌트는 이런식으로 넣으면 적용됨 */}
            <MapContainer
              initialPath={routePath.length > 0 ? routePath : verificationData?.path}
              markers={markers}
              isVerification={true}
            />
          </S.MapContainer>

          {/* ℹ️ 가이드라인 + 가이드 확인 버튼 */}
          <S.GuidelineWrapper>
            <S.Guideline>
              내가 다녀온 멍로깅 코스를
              <br />
              이웃들에게 추천할 수 있어요 !
            </S.Guideline>
          </S.GuidelineWrapper>

          {showImages && (
            <>
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
            </>
          )}

          <S.UploadButton onClick={() => setShowImages((prev) => !prev)}>
            <ImgIcon width="23" height="22" />
            <p>인증사진</p>
          </S.UploadButton>

          {/* ✅ 인증하기 버튼 */}
          <S.RecomendBtn onClick={() => navigate(`/record/${verificationData.verificationId}/recommend`)}>
            코스 추천하기
          </S.RecomendBtn>
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

export default MyRecord;
