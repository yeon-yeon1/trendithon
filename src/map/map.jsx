import React, { useEffect, useState } from "react";
import * as M from "../map/mapStyled.js";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header"; //헤더
import MapContainer from "./components/MapContainer.jsx"; // ✅ 새로 만든 지도 컴포넌트 불러오기

// svg 파일
import { ReactComponent as FindIcon } from "../assets/Find.svg";
import LocationIcon from "../assets/Location.svg";

<M.IconWrapper>
  <img src={LocationIcon} alt="위치 아이콘" width="50" height="50" />
</M.IconWrapper>;

const TMAP_KEY = process.env.REACT_APP_TMAP_KEY;

const Map = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [path, setPath] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null); // ✅ 현재 위치 저장
  const [pageState, setPageState] = useState("initial"); // ✅ 상태 추가
  const [startPoint, setStartPoint] = useState(null); // 출발지 저장
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false); // 하단 모달
  const [courseName, setCourseName] = useState(""); // 플로깅 코스 이름 입력 값
  const navigate = useNavigate(); // ✅ 경로 이동

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

  const getTopMessage = () => {
    if (pageState === "initial") return "지도를 눌러 경로를 표시해 주세요";
    // if (pageState === "setStartPoint") return "출발지를 검색해 보세요";
    if (pageState === "setStartPoint")
      return (
        <>
          <FindIcon width="19" height="21" /> 출발지를 검색해 보세요
        </>
      );
    if (pageState === "marking") return "지도를 눌러 경로를 표시해주세요";
  };

  const getButtonLabel = () => {
    if (pageState === "initial") return "플로깅 경로 표시하기";
    if (pageState === "setStartPoint") return "출발지로 설정하기";
    if (pageState === "marking") return "경로 저장하기";
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
    setSearchQuery(""); // 검색어 초기화
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

  // ✅✅ 현재 위치가 설정되면 첫 번째 마커 추가
  // useEffect(() => {
  //   if (map && currentLocation) {
  //     console.log("📍 첫 번째 마커 추가:", currentLocation);

  //     setMarkers((prevMarkers) => {
  //       const newMarker = createNumberedMarker(
  //         map,
  //         new window.kakao.maps.LatLng(currentLocation.lat, currentLocation.lng),
  //         0
  //       );
  //       return [newMarker, ...prevMarkers]; // 첫 번째 마커는 항상 1번
  //     });

  //     setPath((prevPath) => [{ lat: currentLocation.lat, lng: currentLocation.lng }, ...prevPath]);
  //   }
  // }, [map, currentLocation]);

  // ✅ 지도 클릭 이벤트 → 좌표 저장 & 마커 추가
  // ✅ "marking" 상태일 때만 지도 연속 클릭 이벤트 활성화
  useEffect(() => {
    if (!map) return;

    const handleClick = (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      console.log("📍 클릭한 출발지:", latlng.getLat(), latlng.getLng());

      if (pageState === "setStartPoint") {
        // ✅ 기존 마커 삭제 후 새로운 출발지만 유지
        setStartPoint({ lat: latlng.getLat(), lng: latlng.getLng() });

        // ✅ 이전 출발지 마커 제거 후 새로운 마커 추가
        setMarkers((prevMarkers) => {
          // 기존 마커 제거 (비워주고 새로운 마커 추가)
          prevMarkers.forEach((marker) => marker.setMap(null));
          const newMarker = createNumberedMarker(map, latlng, 0);
          return [newMarker]; // ✅ 출발지는 항상 하나만 유지
        });

        // ✅ 출발지 경로도 하나만 유지
        setPath([{ lat: latlng.getLat(), lng: latlng.getLng() }]);
      } else if (pageState === "marking") {
        // ✅ marking 상태에서는 기존 마커 유지하고 계속 추가 가능
        setMarkers((prevMarkers) => {
          const newMarker = createNumberedMarker(map, latlng, prevMarkers.length);
          return [...prevMarkers, newMarker];
        });

        setPath((prevPath) => [...prevPath, { lat: latlng.getLat(), lng: latlng.getLng() }]);
      }
    };

    window.kakao.maps.event.addListener(map, "click", handleClick);

    return () => {
      window.kakao.maps.event.removeListener(map, "click", handleClick);
    };
  }, [map, pageState]);

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

  //✅ 순서
  const createNumberedMarker = (map, position, index) => {
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
        box-shadow: 0 2px 13px  #D1FFD8;
        border: 4px solid #7ADCDB
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
        // strokeOpacity: 0.7,
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
        {pageState === "marking" && <M.Button onClick={handleOpenSaveModal}>{getButtonLabel()}</M.Button>}

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
              {/* <M.SaveButton onClick={() => navigate("/verification", { state: { courseName, path } })}>
                플로깅 인증하기
              </M.SaveButton> */}
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
