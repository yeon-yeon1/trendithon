import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as F from "./FooterStyled"; // ✅ 기존 스타일 재사용

const menuItems = [
  { Icon: F.HomeIcon, path: "/home", ActiveIcon: F.HomeIconActive },
  { Icon: F.CommuIcon, path: "/community", ActiveIcon: F.CommuIconActive },
  { Icon: F.FlagIcon, path: "/plogging", ActiveIcon: F.FlagIconActive },
  { Icon: F.MyPageIcon, path: "/mypage", ActiveIcon: F.MyPageIconActive },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 현재 경로 가져오기

  return (
    <F.Footer>
      {menuItems.map((item, index) => {
        const isActive = location.pathname.startsWith(item.path); // ✅ 현재 페이지와 비교
        const IconComponent = isActive ? item.ActiveIcon : item.Icon; // ✅ 활성화된 아이콘 선택

        return (
          <F.NavItem key={index} onClick={() => navigate(item.path)} isActive={isActive}>
            <IconComponent />
          </F.NavItem>
        );
      })}
    </F.Footer>
  );
};

export default Footer;
