import { useState, useEffect } from "react";

const useGeolocation = (isActive) => {
  const [location, setLocation] = useState({ lat: null, lng: null, error: null });

  useEffect(() => {
    if (!isActive) return; // 활성화 상태가 아닐 경우 실행 X

    if (!navigator.geolocation) {
      setLocation((prev) => ({ ...prev, error: "Geolocation을 지원하지 않는 브라우저입니다." }));
      return;
    }

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation((prev) => ({ ...prev, error: error.message }));
        },
        { enableHighAccuracy: true }
      );
    };

    // 최초 실행
    updateLocation();

    // 1초마다 위치 업데이트
    const intervalId = setInterval(updateLocation, 10);
    console.log(0);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
  }, [isActive]);

  return location;
};

export default useGeolocation;
