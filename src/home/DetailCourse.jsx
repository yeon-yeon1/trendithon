import React from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../home/styledDetailCourse";

const DetailCourse = () => {
  const navigate = useNavigate();

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
          <H.Title>춘식이 멍로깅</H.Title>
        </H.Header>
        <H.CalendarBox />
        <H.DateText>플로깅 일자 2025-01-31</H.DateText>
        <H.TitleBox />
        <H.TitleText>청계천 멍로깅</H.TitleText>
        <H.LocationBox />
        <H.LocationText>서울시 종로구 종로5가</H.LocationText>
        <H.DetailMap>
          <img src="/images/DetailMap1.svg" alt="Description of image" />
        </H.DetailMap>
      </H.Container>

      <H.Footer>
        {/* 하단바 없는 페이지들은 Footer 통째로 지우시면 됩니다*/}
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
