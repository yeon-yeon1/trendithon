import React, { useEffect, useState, useRef } from "react";
import * as M from "../map/mapStyled.js";
import * as V from "../map/VerificationStyled.js";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header"; //헤더
import MapContainer from "./components/MapContainer.jsx"; // ✅ 새로 만든 지도 컴포넌트 불러오기
import useFakeGeolocation from "./hooks/useFakeGeolocation"; // 🔥 가짜 위치 훅 import
// import useFakeGeolocation from "./hooks/useGeolocation"; // 🔥 진짜 위치 훅 import

// svg 파일
import { ReactComponent as FindIcon } from "../assets/Find.svg";
import { ReactComponent as BackIcon } from "../assets/Back.svg";
import { ReactComponent as RightArrowIcon } from "../assets/RightArrow.svg";
import CloseIcon from "../assets/ModalClose.svg";
import LocationIcon from "../assets/Location.svg";
import locationMarkerImg from "../assets/LocationMarker.svg"; // ✅ 사용자 위치를 표시할 이미지

const TMAP_KEY = process.env.REACT_APP_TMAP_KEY;

const Map = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [path, setPath] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [pageState, setPageState] = useState("initial"); // ✅ 상태 추가
  const [startPoint, setStartPoint] = useState(null); // 출발지 저장
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); // 하단 모달
  const [courseName, setCourseName] = useState(""); // 플로깅 코스 이름 입력 값
  const navigate = useNavigate(); // ✅ 경로 이동

  // 🔥 위치 훅 사용 (verifying 상태일 때만 적용)
  const fakeLocation = useFakeGeolocation(pageState === "verifying");
  const [currentLocation, setCurrentLocation] = useState(null);
  const prevVerifiedMarkers = useRef(new Set()); // ✅ Set 사용하면 중복 제거 가능
  const currentLocationMarker = useRef(null); // ✅ 현재 위치 마커를 useRef로 관리

  // 🔥 pageState가 verifying일 때 위치 적용
  useEffect(() => {
    if (pageState === "verifying") {
      setCurrentLocation(fakeLocation);
    }
  }, [fakeLocation, pageState]);

  // ✅ 현재 위치 마커를 실시간으로 이동하도록 수정
  useEffect(() => {
    if (!map || !currentLocation) return;

    if (!currentLocationMarker.current) {
      // ✅ 처음 실행될 때 현재 위치 마커 생성
      const imageSize = new window.kakao.maps.Size(30, 30); // 이미지 크기 조절
      const imageOption = { offset: new window.kakao.maps.Point(20, 20) }; // 중심 조정
      const markerImage = new window.kakao.maps.MarkerImage(locationMarkerImg, imageSize, imageOption);

      currentLocationMarker.current = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
        map: map,
        image: markerImage,
      });
    } else {
      // ✅ 위치가 변경되면 기존 마커의 위치만 업데이트 (새 마커를 생성하지 않음)
      currentLocationMarker.current.setPosition(new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng));
    }

    // ✅ 지도 중심을 현재 위치로 이동
    map.setCenter(new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng));
  }, [currentLocation, map]);

  // 👌🏻 마커 방문 시 색상 변경 & 중복 추가 방지

  useEffect(() => {
    if (pageState !== "verifying" || !currentLocation || !markers.length) return;

    setMarkers((prevMarkers) => {
      return prevMarkers.map((marker, index) => {
        const markerPos = marker.getPosition();
        const distance = getDistance(currentLocation.lat, currentLocation.lng, markerPos.getLat(), markerPos.getLng());

        if (distance <= 25) {
          prevVerifiedMarkers.current.add(index); // ✅ 방문한 마커를 기록
          marker.setMap(null);
          return createNumberedMarker(map, markerPos, prevVerifiedMarkers.current.size - 1, true);
        }

        return marker;
      });
    });
  }, [currentLocation, pageState]);

  // 💕 수정된 createNumberedMarker 함수 (방문 시 색 변경)
  const createNumberedMarker = (map, position, index, isVerified) => {
    const markerColor = isVerified ? "#F9957F" : "#7ADCDB"; // 방문한 마커는 빨간색, 방문 전은 기본색
    const boxShadowColor = isVerified ? "#F9957F" : "#D1FFD8";

    const markerContent = `
      <div style="
        width: 24px; height: 24px; 
        background-color: white; 
        color: black;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        border-radius: 50%;
        box-shadow: 0 2px 13px ${boxShadowColor};
        border: 4px solid ${markerColor};
        transition: "background-color 0.3s ease", // 부드러운 색상 변경 효과
      ">
        ${index + 1}
      </div>
    `;
    const markerOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: markerContent,
      yAnchor: 0.5,
      xAnchor: 0.5,
    });

    markerOverlay.setMap(map);
    return markerOverlay;
  };

  // 마커 추가할 때 중복 추가 방지
  useEffect(() => {
    if (!map) return;

    const handleClick = (mouseEvent) => {
      const latlng = mouseEvent.latLng;

      if (pageState === "setStartPoint") {
        setStartPoint({ lat: latlng.getLat(), lng: latlng.getLng() });

        setMarkers((prevMarkers) => {
          prevMarkers.forEach((marker) => marker.setMap(null)); // 기존 마커 삭제
          return [createNumberedMarker(map, latlng, 0, false)]; // 기본 색상 마커
        });

        setPath([{ lat: latlng.getLat(), lng: latlng.getLng() }]);
      } else if (pageState === "marking") {
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          createNumberedMarker(map, latlng, prevMarkers.length, false), // 기본 색상
        ]);

        setPath((prevPath) => [...prevPath, { lat: latlng.getLat(), lng: latlng.getLng() }]);
      }
    };

    window.kakao.maps.event.addListener(map, "click", handleClick);

    return () => {
      window.kakao.maps.event.removeListener(map, "click", handleClick);
    };
  }, [map, pageState]);

  // 거리 계산 함수 (Haversine 공식 사용) - gpt 긁어옴...
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // 지구 반지름 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleOpenSaveModal = () => {
    setIsSaveModalOpen(true); // ✅ 모달창 열기
  };

  // ✅ "플로깅 인증하기" 버튼 클릭 시 이동
  const handleNavigateToVerification = () => {
    if (!courseName.trim()) {
      alert("플로깅 코스 이름을 입력해 주세요!");
      return;
    }

    navigate("/verification", {
      state: {
        courseName, // ✅ 사용자가 입력한 코스 이름
        path, // ✅ 지도에서 설정한 경로(좌표 리스트)
      },
    });
  };

  const handleStartPlogging = () => setPageState("setStartPoint");
  const handleSetStartPoint = () => {
    if (!startPoint) {
      alert("출발지를 먼저 선택해 주세요!");
      return;
    }
    setPageState("marking");
  };
  const handleStartVerifying = () => setPageState("verifying");

  const getTopMessage = () => {
    if (pageState === "initial") return "지도를 눌러 경로를 표시해 주세요";
    if (pageState === "setStartPoint")
      return (
        <>
          <FindIcon width="19" height="21" /> 출발지를 검색해 보세요
        </>
      );
    if (pageState === "marking") return "지도를 눌러 경로를 표시해주세요";
    if (pageState === "verifying")
      return (
        <>
          <BackIcon
            onClick={() => {
              setPageState("setStartPoint"); // ✅ pageState 변경
              prevVerifiedMarkers.current.clear(); // ✅ 방문 인증된 마커 리스트 초기화

              if (polyline) {
                polyline.setMap(null); // ✅ 지도에서 폴리라인 제거
              }

              // ✅ 지도에서 기존 마커 제거
              markers.forEach((marker) => marker.setMap(null));
              setMarkers([]); // ✅ 상태 초기화

              setPolyline(null); // ✅ 상태 초기화
              setPath([]); // ✅ 기존 경로 데이터 삭제
            }}
            width="19"
            height="21"
          />
          <span>경로 다시 설정하기</span>
        </>
      );
  };

  const getButtonLabel = () => {
    if (pageState === "initial") return "플로깅 경로 표시하기";
    if (pageState === "setStartPoint") return "출발지로 설정하기";
    if (pageState === "marking") return "경로 저장하기";
    if (pageState === "verifying") return "인증하러 가기";
  };

  // ✅ 검색 UI 상태 관리
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열기/닫기 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 저장
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 목록 저장

  // ✅ 검색창 열기/닫기 함수 추가
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  // ✅ 검색창 닫기 함수
  const handleCloseSearch = () => {
    setIsSearchOpen(false); // 검색창 닫기
    // setSearchQuery(""); // 검색어 초기화
    setSearchResults([]); // 검색 결과 초기화
  };

  // ✅ 검색 실행 함수
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("검색어를 입력하세요!"); // 검색어가 없을 경우 경고창 띄움
      return;
    }

    if (!window.kakao || !window.kakao.maps) {
      console.error("🚨 카카오 맵이 로드되지 않았습니다.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchQuery, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data); // 검색 결과 저장
      } else {
        setSearchResults([]);
        console.warn("⚠️ 검색 결과가 없습니다.");
      }
    });
  };

  // ✅ 검색 결과에서 선택한 위치를 출발지로 설정
  const selectLocation = (place) => {
    const lat = parseFloat(place.y);
    const lng = parseFloat(place.x);

    setStartPoint({ lat, lng });

    // ✅ 기존 마커 삭제 후 새로운 마커 추가
    setMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => marker.setMap(null)); // 이전 마커 삭제
      const newMarker = createNumberedMarker(map, new window.kakao.maps.LatLng(lat, lng), 0);
      return [newMarker];
    });

    setPath([{ lat, lng }]);

    if (map) {
      map.setCenter(new window.kakao.maps.LatLng(lat, lng));
    }

    setIsSearchOpen(false); // ✅ 검색창 닫기
  };

  // ✅ 경로 업데이트 (두 개씩 연결)
  useEffect(() => {
    if (map && path.length > 1) {
      console.log("🚀 getWalkingRoute 실행됨! path:", path);
      getWalkingRoute(path[path.length - 2], path[path.length - 1]);
    }
  }, [map, path]);

  // ✅ Tmap 도보 길찾기 API 호출
  const getWalkingRoute = async (startCoord, goalCoord) => {
    if (!startCoord || !goalCoord) return;

    if (!TMAP_KEY) {
      console.error("🚨 Tmap API 키가 설정되지 않았습니다.");
      return;
    }

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
            feature.geometry.coordinates.map(([lng, lat]) => new window.kakao.maps.LatLng(lat, lng))
          );

        updatePolyline(newRoutePath);
      } else {
        console.warn("⚠️ 도보 경로 데이터가 없습니다!");
      }
    } catch (error) {
      console.error("🚨 Tmap 도보 길찾기 실패:", error);
    }
  };

  // ✅ 폴리라인(경로 선) 업데이트
  const updatePolyline = (newPath) => {
    if (!newPath.length) return;

    let mergedPath = [];
    if (polyline) {
      mergedPath = [...polyline.getPath(), ...newPath];
      polyline.setPath(mergedPath);
    } else {
      mergedPath = newPath;
      const newPolyline = new window.kakao.maps.Polyline({
        map: map,
        path: mergedPath,
        strokeWeight: 10,
        strokeColor: "#7ADCDB",
        strokeStyle: "solid",
      });
      setPolyline(newPolyline);
    }

    console.log("📌 업데이트된 전체 경로:", mergedPath);
  };

  return (
    <>
      {/* ✅ 지도 영역 */}
      <M.Container>
        <MapContainer
          setMap={setMap}
          setCurrentLocation={setCurrentLocation} // ✅ 이거 추가하면 해결됨!
        />

        <M.TopMessage pageState={pageState} onClick={pageState === "setStartPoint" ? toggleSearch : null}>
          {getTopMessage()}
        </M.TopMessage>

        {isSearchOpen && (
          <>
            <M.SearchContainer>
              <Header
                searchQuery={searchQuery} // ✅ 검색어 상태 전달
                setSearchQuery={setSearchQuery} // ✅ 검색어 변경 함수 전달
                onSearch={handleSearch} // ✅ 검색 버튼 클릭 시 실행할 함수 전달
                onCancel={handleCloseSearch} // ✅ 실행 취소 기능 추가
              />
            </M.SearchContainer>
            <M.SearchResults>
              {searchResults.map((place) => (
                <M.SearchResultItem key={place.id} onClick={() => selectLocation(place)}>
                  <M.IconWrapper>
                    <img src={LocationIcon} alt="위치 아이콘" width="26" height="26" />
                  </M.IconWrapper>
                  <M.PlaceInfo>
                    <M.PlaceName>{place.place_name}</M.PlaceName>
                    {place.address_name && <M.PlaceAddress>{place.address_name}</M.PlaceAddress>}
                  </M.PlaceInfo>
                </M.SearchResultItem>
              ))}
            </M.SearchResults>
          </>
        )}
        {pageState === "initial" && <M.Button onClick={handleStartPlogging}>{getButtonLabel()}</M.Button>}
        {pageState === "setStartPoint" && <M.Button onClick={handleSetStartPoint}>{getButtonLabel()}</M.Button>}
        {pageState === "marking" && <M.Button onClick={handleStartVerifying}>{getButtonLabel()}</M.Button>}
        {/* ✅ 플로깅 지점 표시 모달 (pageState가 marking일 때) */}
        {pageState === "initial" && (
          <M.Backdrop2>
            <M.ModalContainer>
              <M.ModalTitle>지도를 눌러 플로깅 지점을 표시해 주세요</M.ModalTitle>
              <M.ModalExtraText>(2 지점 이상)</M.ModalExtraText>
              <M.ModalText>각 지점마다 플로깅 인증사진을 남겨 주세요</M.ModalText>
              <M.ModalHighlight>플로깅 마지막 지점에서 인증 화면이 뜹니다.</M.ModalHighlight>
              <M.GuideButton onClick={() => navigate("/guide")}>
                가이드 확인 <RightArrowIcon width="5" height="9" />
              </M.GuideButton>
              <M.ModalGuide>가이드를 꼭 확인해 주세요!!</M.ModalGuide>
              <M.ModalCloseButton onClick={() => setPageState("setStartPoint")}>
                <img src={CloseIcon} alt="위치 아이콘" width="16" height="16" />
              </M.ModalCloseButton>
            </M.ModalContainer>
          </M.Backdrop2>
        )}

        {/* ✅ 인증 버튼: 모든 마커 방문해야 활성화 */}
        {pageState === "verifying" && (
          <M.Button
            onClick={handleOpenSaveModal}
            disabled={prevVerifiedMarkers.current.size !== markers.length}
            style={{
              backgroundColor: prevVerifiedMarkers.current.size !== markers.length ? "#678a89" : "#7adcdb", // ✅ 비활성화(회색), 활성화(초록색)
              cursor: prevVerifiedMarkers.current.size !== markers.length ? "not-allowed" : "pointer", // ✅ 클릭 불가능 시 'not-allowed'
              transition: "background-color 0.3s ease", // ✅ 부드러운 색상 변경 효과
            }}
          >
            {getButtonLabel()}
          </M.Button>
        )}

        {/* ✅ 경로 저장 모달 */}
        {isSaveModalOpen && (
          <M.Backdrop onClick={() => setIsSaveModalOpen(false)}>
            <M.SaveModal onClick={(e) => e.stopPropagation()}>
              <M.SaveTitle>플로깅 코스 이름</M.SaveTitle>
              <M.SaveTextarea
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="플로깅 코스 이름을 입력해주세요"
              />
              <M.SaveButton onClick={handleNavigateToVerification}>플로깅 인증하기</M.SaveButton>
            </M.SaveModal>
          </M.Backdrop>
        )}

        {/* ✅ 푸터 추가 */}
        <Footer />
      </M.Container>
    </>
  );
};

export default Map;
//
