import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as H from "../home/styledDetailCourse";

const API_BASE_URL = "http://3.34.183.9:8080"; // 백엔드 API URL

const DetailCourse = () => {
  const navigate = useNavigate();
  const { verificationid } = useParams(); // URL 파라미터에서 verificationId 가져오기
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/verification/${verificationid}`
        );
        if (!response.ok) {
          throw new Error("플로깅 코스 데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("❌ 데이터 불러오기 실패:", error);
      }
    };

    if (verificationid) {
      fetchCourseData();
    }
  }, [verificationid]);

  const menuItems = [
    { Icon: H.HomeIcon, path: "/home" },
    { Icon: H.CommuIcon, path: "/community" },
    { Icon: H.FlagIcon, path: "/plogging" },
    { Icon: H.MyPageIcon, path: "/mypage" },
  ];

  return (
    <>
      <H.Container>
        <H.Header>
          <H.BackButton onClick={() => navigate(-1)} />
          <H.Title>
            {courseData ? courseData.petName + " 멍로깅" : "로딩 중..."}
          </H.Title>
        </H.Header>
        {courseData ? (
          <>
            <H.CalendarBox />
            <H.DateText>플로깅 일자 {courseData.date}</H.DateText>
            <H.TitleBox />
            <H.TitleText>{courseData.courseName}</H.TitleText>
            <H.LocationBox />
            <H.LocationText>
              {courseData.path.length > 0
                ? `${courseData.path[0].lat}, ${courseData.path[0].lng}`
                : "위치 정보 없음"}
            </H.LocationText>
            <H.DetailMap>
              <img
                src={courseData.uploadedImages[0] || "/images/DetailMap1.svg"}
                alt="플로깅 경로 지도"
              />
            </H.DetailMap>
          </>
        ) : (
          <h1>데이터 불러오는 중...</h1>
        )}
      </H.Container>

      <H.Footer>
        {menuItems.map((item, index) => (
          <H.NavItem key={index} onClick={() => navigate(item.path)}>
            <item.Icon />
          </H.NavItem>
        ))}
      </H.Footer>
    </>
  );
};

export default DetailCourse;
