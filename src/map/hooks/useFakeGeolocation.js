import { useEffect, useState } from "react";

const useFakeGeolocation = (isActive) => {
  const [location, setLocation] = useState(null); // 초기 위치를 null로 설정
  const [isInitialized, setIsInitialized] = useState(false); // 초기 위치 설정 여부 확인

  useEffect(() => {
    if (!isActive) return;

    // ✅ 1. 브라우저에서 현재 위치 가져오기 (최초 1회 실행)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setIsInitialized(true); // 초기 위치 설정 완료
      },
      (error) => {
        console.error("❌ 위치 가져오기 실패:", error);
        setLocation({ lat: 37.590642162936234, lng: 127.0679800916718 }); // 기본 위치 (서울)
        setIsInitialized(true); // 실패해도 기본 위치로 설정
      }
    );
  }, [isActive]); // isActive가 true일 때 초기 위치 설정

  useEffect(() => {
    if (!isActive || !isInitialized || !location) return; // 위치가 설정되지 않으면 실행 X

    const interval = setInterval(() => {
      setLocation((prevLocation) => ({
        lat: prevLocation.lat + 0.0001, // 약 11m 이동
        lng: prevLocation.lng + 0.0001, // 약 8~9m 이동
      }));
    }, 1000); // 1초마다 위치 변경

    return () => clearInterval(interval);
  }, [isActive, isInitialized, location]); // 초기 위치가 설정된 후부터 실행

  return location;
};

export default useFakeGeolocation;
