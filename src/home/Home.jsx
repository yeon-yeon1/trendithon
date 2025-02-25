import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import * as H from "../home/styledHome";
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // 백엔드 API URL

const Home = () => {
  const navigate = useNavigate();
  const [dogImages, setDogImages] = useState([]);
  const [ploggingCourses, setPloggingCourses] = useState([]); // 플로깅 코스 데이터를 저장할 상태
  const [captureImages, setCaptureImages] = useState({}); // ✅ verificationId별 captureImage 저장

  const goCommunity = () => {
    navigate("/community"); // /community 페이지로 이동
  };

  // 이웃 멍로깅 이미지 불러오기
  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/all`);
        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setDogImages(data);
      } catch (error) {
        console.error("❌ 데이터 불러오기 실패:", error);
      }
    };

    fetchDogImages();
  }, []);

  // ✅ 첫 번째 GET 요청: 플로깅 추천 코스 목록 가져오기
  useEffect(() => {
    const fetchPloggingCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/verification`);
        if (!response.ok) {
          throw new Error("플로깅 추천 코스를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setPloggingCourses(data);

        // ✅ 두 번째 GET 요청: 각 verificationId로 captureImage 가져오기
        data.forEach((course) => {
          fetchCaptureImage(course.verificationId);
        });
      } catch (error) {
        console.error("❌ 플로깅 추천 코스 불러오기 실패:", error);
      }
    };

    fetchPloggingCourses();
  }, []);

  // ✅ 두 번째 GET 요청: captureImage 가져오기
  const fetchCaptureImage = async (verificationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/verification/recommend/${verificationId}`);
      if (!response.ok) {
        throw new Error(`플로깅 추천 이미지 불러오기 실패 (ID: ${verificationId})`);
      }
      const data = await response.json();
      if (data.length > 0) {
        // ✅ captureImage를 저장 (verificationId별로 저장)
        setCaptureImages((prev) => ({ ...prev, [verificationId]: data[0].captureImage }));
      }
    } catch (error) {
      console.error(`❌ 플로깅 추천 이미지 불러오기 실패 (ID: ${verificationId}):`, error);
    }
  };

  const settingsCourse = {
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 1.45,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2500,
    // centerMode: false,
    draggable: false, // ✅ Slick 드래그 비활성화 (스크롤만 사용)
    touchMove: false, // ✅ 터치로 슬라이드 이동 비활성화
  };

  const settingsDog = {
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2500,
    // centerMode: false,
    autoplay: false,
    draggable: true,
    swipeToSlide: true,
  };

  // 카드를 클릭했을 때 해당 ID로 CourseDetail 페이지로 이동
  const handleCourseClick = (verificationId) => {
    navigate(`/coursedetail/${verificationId}`);
  };

  return (
    <>
      <H.Container>
        <H.Banner />
        <H.Text>
          이달의
          <H.BoldText> 플로깅 추천 코스</H.BoldText>
        </H.Text>
        <H.CarouselWrapper className="plogging-carousel">
          <Slider {...settingsCourse}>
            {ploggingCourses
              .filter((course) => captureImages[course.verificationId]) // ✅ 이미지가 있는 코스만 표시
              .map((course, index) => (
                <H.DogCard
                  key={index}
                  onClick={() => handleCourseClick(course.verificationId)} // 클릭 시 해당 ID로 이동
                >
                  <H.DogImage
                    style={{ width: "217px", height: "157px" }}
                    src={captureImages[course.verificationId]} // ✅ 이미지가 있는 경우에만 표시
                    alt={`course-${index}`}
                  />
                  <H.RegionText style={{ color: "black" }}>
                    {course.courseName} {/* courseName을 표시 */}
                  </H.RegionText>
                  <H.PloggingLocation>{course.date}</H.PloggingLocation> {/* date를 표시 */}
                </H.DogCard>
              ))}
          </Slider>
        </H.CarouselWrapper>

        <H.CarouselContainer style={{ marginTop: "10px" }}>
          <H.Text>
            이웃
            <H.BoldText> 멍로깅</H.BoldText>
          </H.Text>
          <H.CarouselWrapper>
            <Slider {...settingsDog}>
              {dogImages.map((dog, index) => (
                <H.DogCard onClick={goCommunity} key={index}>
                  <H.DogImage src={dog.imageUrl} alt={`dog-${index}`} />
                  <H.RegionText>{dog.location}</H.RegionText>
                </H.DogCard>
              ))}
            </Slider>
          </H.CarouselWrapper>
        </H.CarouselContainer>
      </H.Container>
      <Footer />
    </>
  );
};

export default Home;
