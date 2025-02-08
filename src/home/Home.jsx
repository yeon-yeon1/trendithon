import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import * as H from "../home/styledHome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    { Icon: H.HomeIcon, path: "/home" },
    { Icon: H.CommuIcon, path: "/community" },
    { Icon: H.FlagIcon, path: "/plogging" },
    { Icon: H.MyPageIcon, path: "/mypage" },
  ];

  const courseImages = [
    {
      src: "/images/ExMap1.svg",
      name: "청계천 플로깅",
      region: "서울시 종로구",
    },
    {
      src: "/images/ExMap2.svg",
      name: "지역환경축제",
      region: "서울시 서초구",
    },
    {
      src: "/images/ExMap1.svg",
      name: "청계천 플로깅",
      region: "서울시 서초구",
    },
    {
      src: "/images/ExMap2.svg",
      name: "지역환경축제",
      region: "서울시 서초구",
    },
    {
      src: "/images/ExMap1.svg",
      name: "청계천 플로깅",
      region: "서울시 서초구",
    },
    {
      src: "/images/ExMap2.svg",
      name: "지역환경축제",
      region: "서울시 서초구",
    },
  ];

  const dogImages = [
    { src: "/images/dog1.svg", region: "서울시 종로구" },
    { src: "/images/dog2.svg", region: "서울시 서대문구" },
    { src: "/images/dog3.svg", region: "기본 이미지" },
  ];

  const settingsCourse = {
    infinite: false, // 처음부터 왼쪽 카드가 보이게 설정
    arrows: true,
    speed: 500,
    slidesToShow: 1.45, // 왼쪽 카드가 더 보이게 설정
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    centerMode: false, // 중앙 정렬 해제
  };

  const settingsDog = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2.3, // 한 번에 2.3개씩 표시
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <>
      <H.Container>
        {/* 메인 배너*/}
        <H.Banner />
        {/* 이달의 추천 코스 캐러셀 */}
        <H.Text>
          이달의
          <H.BoldText> 플로깅 추천 코스</H.BoldText>
        </H.Text>
        <H.CarouselWrapper className="plogging-carousel">
          <Slider {...settingsCourse}>
            {courseImages.map((course, index) => (
              <H.DogCard key={index}>
                <H.DogImage
                  style={{ width: "217px", height: "157px" }}
                  src={course.src}
                  alt={`course-${index}`}
                />
                <H.RegionText style={{ color: "black" }}>
                  {course.name}
                </H.RegionText>
                <H.PloggingLocation>{course.region}</H.PloggingLocation>
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
                  <H.DogImage src={dog.src} alt={`dog-${index}`} />
                  <H.RegionText>{dog.region}</H.RegionText>
                </H.DogCard>
              ))}
            </Slider>
          </H.CarouselWrapper>
        </H.CarouselContainer>
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

export default Home;
