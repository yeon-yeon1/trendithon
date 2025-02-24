import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as F from "./FooterStyled"; // ✅ 기존 스타일 재사용

const menuItems = [
  { Icon: F.HomeIcon, path: ["/home"], ActiveIcon: F.HomeIconActive },
  { Icon: F.CommuIcon, path: ["/community", "/write"], ActiveIcon: F.CommuIconActive }, // ☑️ write 페이지에서도 커뮤니티 Icon 활성화
  { Icon: F.FlagIcon, path: ["/plogging"], ActiveIcon: F.FlagIconActive },
  { Icon: F.MyPageIcon, path: ["/mypage"], ActiveIcon: F.MyPageIconActive },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 현재 경로 가져오기

  return (
    <F.Footer>
      {menuItems.map((item, index) => {
        const isActive = item.path.some((p) => location.pathname.startsWith(p)); // ✅ 배열 내 경로 비교
        const IconComponent = isActive ? item.ActiveIcon : item.Icon; // ✅ 활성화된 아이콘 선택

        return (
          <F.NavItem key={index} onClick={() => navigate(item.path[0])} isActive={isActive}>
            <IconComponent />
          </F.NavItem>
        );
      })}
    </F.Footer>
  );
};

export default Footer;
