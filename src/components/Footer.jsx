import React from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../home/styledHome"; // ✅ 기존 스타일 재사용

const menuItems = [
  { Icon: H.HomeIcon, path: "/home" },
  { Icon: H.CommuIcon, path: "/community" },
  { Icon: H.FlagIcon, path: "/plogging" },
  { Icon: H.MyPageIcon, path: "/mypage" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <H.Footer>
      {menuItems.map((item, index) => (
        <H.NavItem key={index} onClick={() => navigate(item.path)}>
          <item.Icon />
        </H.NavItem>
      ))}
    </H.Footer>
  );
};

export default Footer;
