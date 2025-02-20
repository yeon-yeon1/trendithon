import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapContainer from "../../src/map/components/MapContainer";
import * as S from "./MapStyled";
import { ReactComponent as CalendarIcon } from "../assets/Calendar.svg";
import { ReactComponent as LocationIcon } from "../assets/WhiteLocation.svg";

const TMAP_KEY = process.env.REACT_APP_TMAP_KEY;
const KAKAO_MAP_KEY = process.env.REACT_APP_KAKAO_KEY;

const MapReference = () => {
  const { id } = useParams();

  // ✅ 더미 데이터
  const dummyData = [
    {
      id: "1",
      petName: "춘식이",
      courseName: "테스트 플로깅 코스",
      date: "2025-02-20",
      path: [
        { lat: 37.590943780219185, lng: 127.06868354689978 },
        { lat: 37.59134899513877, lng: 127.06908021616594 },
      ],
      uploadedImages: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
  ];

  // ✅ 데이터 및 상태
  const [selectedData] = useState(dummyData.find((item) => item.id === id) || dummyData[0]);
  const [markers, setMarkers] = useState([]);
  const [routePath, setRoutePath] = useState(selectedData.path);
  const [address, setAddress] = useState("");

  const mapRef = useRef(null);

  // ✅ 카카오맵 API - path 기반으로 주소 가져오기
  useEffect(() => {
    if (selectedData?.path?.length > 0) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      // ✅ 첫 번째 path 좌표 사용
      const { lat, lng } = selectedData.path[0];

      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address;
          setAddress(`${address.region_1depth_name} ${address.region_2depth_name}`); // ✅ 시/구 정보 설정
        } else {
          console.error("주소를 가져올 수 없습니다.");
        }
      });
    }
  }, [selectedData?.path]); // ✅ path 변경 시마다 실행

  // ✅ 마커 설정 (selectedData.path 기준)
  useEffect(() => {
    if (!selectedData?.path) return;

    const numberedMarkers = selectedData.path.map((point, index) => ({
      lat: point.lat,
      lng: point.lng,
      number: index + 1,
    }));

    setMarkers(numberedMarkers);
  }, [selectedData]);

  // ✅ 지도가 마커 기준으로 중심 이동하도록 설정
  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(new window.kakao.maps.LatLng(marker.lat, marker.lng));
      });
      mapRef.current.setBounds(bounds);
    }
  }, [markers]);

  // ✅ Tmap 도보 길찾기 API 사용
  useEffect(() => {
    if (!selectedData?.path || selectedData.path.length < 2 || !TMAP_KEY) return;

    const getWalkingRoute = async () => {
      console.log("🚀 Tmap 도보 길찾기 API 호출 시작!");

      const startCoord = selectedData.path[0];
      const goalCoord = selectedData.path[selectedData.path.length - 1];
      const viaPoints = selectedData.path.slice(1, -1).map((point, index) => ({
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
        viaPoints,
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

          setRoutePath(newRoutePath);
        } else {
          console.warn("⚠️ 도보 경로 데이터가 없습니다!");
        }
      } catch (error) {
        console.error("🚨 Tmap 도보 길찾기 실패:", error);
      }
    };

    getWalkingRoute();
  }, [selectedData]);

  if (!selectedData) {
    return <p>데이터를 불러오는 중...</p>;
  }

  return (
    <>
      <S.Container>
        {/* ✅ petName을 Header로 전달 */}
        <Header petName={selectedData.petName} />

        <S.Container2>
          <S.DatePickerWrapper>
            <S.DateBadge>
              플로깅 일자 {selectedData.date} <CalendarIcon width="12.5" height="12.5" />
            </S.DateBadge>
          </S.DatePickerWrapper>

          <S.courseName>{selectedData.courseName}</S.courseName>

          {/* ✅ 위치 정보 추가 */}
          <S.AddressContainer>
            <LocationIcon /> {address || "위치를 불러오는 중..."}
          </S.AddressContainer>

          <S.MapContainer>
            <MapContainer initialPath={routePath} markers={markers} isVerification={true} mapRef={mapRef} />
          </S.MapContainer>
        </S.Container2>
      </S.Container>
      <Footer />
    </>
  );
};

export default MapReference;
