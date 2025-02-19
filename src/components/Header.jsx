import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as H from "./HeaderStyled"; // ✅ 스타일 파일
import * as M from "../map/mapStyled"; // ✅ Map 스타일 가져오기
import { ReactComponent as BackIcon } from "../assets/Back.svg";
import { ReactComponent as SearchIcon } from "../assets/WhiteFind.svg"; // ✅ 검색 버튼 아이콘 추가

const Header = ({ searchQuery, setSearchQuery, onSearch, onCancel, petName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPlogging = location.pathname === "/plogging";
  const isAdmin = location.pathname === "/admin";
  const isAdminDetail = location.pathname.startsWith("/admin/detail/"); // ✅ 관리자 상세 페이지
  const isJoin = location.pathname === "/join";

  //레퍼런스때문에 추가
  const isMR = location.pathname === "/rm";

  const getHeaderTitle = () => {
    const path = location.pathname;

    if (path === "/verification") return "플로깅 인증";
    if (path === "/guide") return "사진 인증 가이드라인";
    if (path === "/admin") return "관리자 페이지";
    if (path === "/join") return "회원가입";

    // ✅ `/admin/detail/`로 시작하는 모든 경로에 "관리자 상세 페이지" 제목 표시
    if (path.startsWith("/admin/detail/")) return "관리자 상세 페이지";

    //레퍼런스때문에 추가
    if (path === "/rm") return `${petName} 멍로깅`;

    return "";
  };

  return (
    <H.Header isPlogging={isPlogging} isAdmin={isAdmin} isAdminDetail={isAdminDetail} isJoin={isJoin} isMR={isMR}>
      {/* ✅ isPlogging prop 전달 */}
      <H.BackButton
        isAdmin={isAdmin}
        onClick={() => {
          if (isPlogging) {
            onCancel();
          } else if (isJoin) {
            navigate("/login");
          } else {
            navigate(-1);
          }
        }}
      >
        <BackIcon width="30" height="30" />
      </H.BackButton>
      {/* ✅ /plogging 페이지에서는 검색창과 검색 버튼만 표시 */}
      {isPlogging ? (
        <>
          <M.SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="출발지를 검색해 보세요"
          />
          <M.SearchButton onClick={onSearch}>
            <SearchIcon width="20" height="20" />
          </M.SearchButton>
        </>
      ) : (
        getHeaderTitle()
      )}
    </H.Header>
  );
};

export default Header;
