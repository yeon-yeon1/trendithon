import React, { useEffect, useState } from "react";
import * as M from "../mapStyled.js";
import { useLocation } from "react-router-dom"; // ✅ 현재 URL 경로 가져오기
import useGeolocation from "../hooks/useGeolocation"; // ✅ 사용자 위치 추적 훅 가져오기
import useFakeGeolocation from "../hooks/useFakeGeolocation"; // ✅ 가짜 위치 데이터 사용

const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;

const MapContainer = ({ setMap = null, setCurrentLocation = null, initialPath, markers = [], isVerification }) => {
  const location = useLocation(); // ✅ 현재 페이지의 URL 경로 가져오기
  const [mapInstance, setMapInstance] = useState(null);
  // const { lat, lng, error } = useGeolocation(); // ✅ 사용자 위치 가져오기
  const { lat, lng } = useFakeGeolocation(); // ✅ 가짜 위치 데이터 사용

  useEffect(() => {
    console.log("🚀 페이지 이동 감지:", location.pathname);

    if (!KAKAO_KEY) {
      console.error("🚨 카카오 API 키가 설정되지 않았습니다.");
      return;
    }

    console.log("🔍 카카오 맵 스크립트 로드 확인");

    // ✅ 1. 카카오 맵 SDK가 이미 로드되었는지 확인 후, 없으면 추가
    if (!document.getElementById("kakao-map-script")) {
      console.log("✅ 카카오 맵 스크립트가 아직 없음. 스크립트 추가 시작!");

      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services,clusterer,drawing`;
      script.async = true;
      document.head.appendChild(script);

      console.log("📜 카카오 맵 스크립트 추가 완료:", script);

      script.onload = () => {
        console.log("🚀 카카오 맵 스크립트 로드 완료!");
        window.kakao.maps.load(() => {
          console.log("🗺️ 카카오 맵 로드 시작");
          initializeMap();
        });
      };
    } else {
      console.log("⚠️ 이미 카카오 맵 스크립트가 추가되어 있음. 바로 지도 초기화 실행.");
      initializeMap();
    }

    // ✅ 2. 실제로 카카오 맵을 생성하는 함수
    function initializeMap() {
      console.log("🔄 지도 초기화 시작");
      const container = document.getElementById("map");

      if (!container) {
        console.error("❌ 지도 컨테이너(#map)가 존재하지 않습니다.");
        return;
      }

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };

      const newMapInstance = new window.kakao.maps.Map(container, options);
      setMapInstance(newMapInstance);
      if (setMap) {
        setMap(newMapInstance);
      }

      console.log("🗺️ 카카오 지도 생성 완료:", newMapInstance);
    }
  }, [location.pathname]); // ✅ 페이지 경로가 변경될 때마다 실행

  // ✅ 3. 현재 위치 가져와서 지도 중심 이동 (인증 페이지가 아닐 때만 실행)
  useEffect(() => {
    if (!mapInstance || isVerification) return;

    console.log("🌍 현재 위치 가져오기 실행됨");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("📌 현재 위치:", lat, lng);

        const currentLocation = new window.kakao.maps.LatLng(lat, lng);
        mapInstance.setCenter(currentLocation);

        if (setCurrentLocation) {
          setCurrentLocation({ lat, lng });
        }
      },
      (error) => {
        console.error("❌ 위치 가져오기 실패:", error);
      }
    );
  }, [mapInstance, isVerification]);

  // ✅ 4. 인증 페이지에서 Tmap API를 이용해 모든 마킹 지점을 연결한 폴리라인 & 숫자 마커 표시
  useEffect(() => {
    if (!mapInstance || !isVerification || !initialPath?.length) return;

    console.log("📌 Tmap API를 이용한 경로 표시 시작: ", initialPath);

    let completeRoute = []; // ✅ 최종 도보 경로 저장
    let markersOverlay = []; // ✅ 숫자 마커 저장

    const getFullWalkingRoute = async () => {
      try {
        // ✅ 모든 Tmap API 요청을 병렬 실행
        const routeRequests = initialPath.slice(0, -1).map((startCoord, i) => {
          const goalCoord = initialPath[i + 1];

          const url = `https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&appKey=${process.env.REACT_APP_TMAP_KEY}`;

          const requestBody = {
            startX: startCoord.lng.toString(),
            startY: startCoord.lat.toString(),
            endX: goalCoord.lng.toString(),
            endY: goalCoord.lat.toString(),
            reqCoordType: "WGS84GEO",
            resCoordType: "WGS84GEO",
            startName: `지점 ${i + 1}`,
            endName: `지점 ${i + 2}`,
          };

          return fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }).then((response) => {
            if (!response.ok) throw new Error(`🚨 Tmap API 요청 실패 (지점 ${i + 1} → 지점 ${i + 2})`);
            return response.json();
          });
        });

        // ✅ 모든 API 요청이 끝날 때까지 기다림
        const routeResponses = await Promise.all(routeRequests);

        // ✅ 받은 데이터에서 경로만 추출하여 추가
        routeResponses.forEach((data, i) => {
          if (data.features?.length) {
            const newSegment = data.features
              .filter((feature) => feature.geometry.type === "LineString")
              .flatMap((feature) =>
                feature.geometry.coordinates.map(([lng, lat]) => new window.kakao.maps.LatLng(lat, lng))
              );
            completeRoute = [...completeRoute, ...newSegment];
          } else {
            console.warn(`⚠️ 지점 ${i + 1} → 지점 ${i + 2} 도보 경로 데이터가 없습니다!`);
          }
        });

        // ✅ 사용자 클릭한 마킹 지점(1,2,3,4,5...)만 숫자 마커 추가
        initialPath.forEach((point, index) => {
          const markerOverlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(point.lat, point.lng),
            content: `
            <div style="
              width: 24px; height: 24px; 
              background-color: white; 
              color: black;
              font-weight: bold;
              font-size: 14px;
              text-align: center;
              line-height: 24px;
              border-radius: 50%;
              box-shadow: 0 2px 13px  #D1FFD8;
              border: 4px solid #7ADCDB
            ">
              ${index + 1}
            </div>`,
            yAnchor: 0.5,
            xAnchor: 0.5,
          });

          markerOverlay.setMap(mapInstance);
          markersOverlay.push(markerOverlay); // ✅ 숫자 마커 저장
        });

        // ✅ Tmap API에서 가져온 전체 경로를 폴리라인으로 표시
        if (completeRoute.length) {
          const polyline = new window.kakao.maps.Polyline({
            map: mapInstance,
            path: completeRoute,
            strokeWeight: 10,
            strokeColor: "#7ADCDB",
            strokeStyle: "solid",
          });

          // ✅ 경로의 첫 번째 지점을 지도 중심으로 설정
          mapInstance.setCenter(completeRoute[0]);

          // ✅ 클린업 함수: 컴포넌트 언마운트 시 폴리라인 & 마커 제거
          return () => {
            polyline.setMap(null);
            markersOverlay.forEach((marker) => marker.setMap(null)); // ✅ 숫자 마커 삭제
          };
        }
      } catch (error) {
        console.error("🚨 Tmap 도보 길찾기 실패:", error);
      }
    };

    getFullWalkingRoute();
  }, [mapInstance, isVerification, initialPath]);

  return <M.MapWrapper id="map" />;
};

export default MapContainer;
//
