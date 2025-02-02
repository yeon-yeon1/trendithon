import React from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../home/styledHome";

const Home = () => {
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
        {/* 고정 */}
        {/* 여기에 페이지별 요소 추가하시면 됩니다 */}
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

export default Home;
