import { useEffect, useState } from "react";

const useFakeGeolocation = (isActive) => {
  const [location, setLocation] = useState({
    lat: 37.590642162936234, // 초기 위치 (서울)
    lng: 127.0679800916718,
  });

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setLocation((prevLocation) => ({
        lat: prevLocation.lat + 0.0001, // 약 11m 이동
        lng: prevLocation.lng + 0.0001, // 약 8~9m 이동
      }));
    }, 1000); // 1초마다 위치 변경

    return () => clearInterval(interval);
  }, [isActive]);

  return location;
};

export default useFakeGeolocation;
