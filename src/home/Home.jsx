import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import * as H from "../home/styledHome";
import * as F from "../components/FooterStyled"; // ✅ 기존 스타일 재사용
import Footer from "../components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_BASE_URL = "http://3.34.183.9:8080"; // 백엔드 API URL

const Home = () => {
  const navigate = useNavigate();
  const [dogImages, setDogImages] = useState([]);
  const [ploggingCourses, setPloggingCourses] = useState([]); // 플로깅 코스 데이터를 저장할 상태

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

  // 플로깅 추천 코스 데이터 불러오기
  useEffect(() => {
    const fetchPloggingCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/verification`);
        if (!response.ok) {
          throw new Error("플로깅 추천 코스를 불러오는 데 실패했습니다.");
        }
        const data = await response.json();
        setPloggingCourses(data);
      } catch (error) {
        console.error("❌ 플로깅 추천 코스 불러오기 실패:", error);
      }
    };

    fetchPloggingCourses();
  }, []);

  const settingsCourse = {
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 1.45,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    centerMode: false,
  };

  const settingsDog = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
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
            {ploggingCourses.map((course, index) => (
              <H.DogCard
                key={index}
                onClick={() => handleCourseClick(course.verificationId)} // 클릭 시 해당 ID로 이동
              >
                <H.DogImage
                  style={{ width: "217px", height: "157px" }}
                  src={course.uploadedImages[0]} // uploadedImages에서 첫 번째 이미지 사용
                  alt={`course-${index}`}
                />
                <H.RegionText style={{ color: "black" }}>
                  {course.courseName} {/* courseName을 표시 */}
                </H.RegionText>
                <H.PloggingLocation>{course.date}</H.PloggingLocation>{" "}
                {/* date를 표시 */}
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
                <H.DogCard key={index}>
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
