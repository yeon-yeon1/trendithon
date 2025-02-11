import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as H from "./HeaderStyled"; // ✅ 스타일 파일
import * as M from "../map/mapStyled"; // ✅ Map 스타일 가져오기
import { ReactComponent as BackIcon } from "../assets/Back.svg";
import { ReactComponent as SearchIcon } from "../assets/WhiteFind.svg"; // ✅ 검색 버튼 아이콘 추가

const Header = ({ searchQuery, setSearchQuery, onSearch, onCancel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPloggingPage = location.pathname === "/plogging";

  // ✅ 페이지 경로에 따라 헤더 텍스트 변경
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case "/verification":
        return "플로깅 인증";
      case "/guide":
        return "사진 인증 가이드라인";
      default:
        return "";
    }
  };

  return (
    // <H.Header>
    <H.Header isPlogging={isPloggingPage}>
      {/* ✅ isPlogging prop 전달 */}
      <H.BackButton onClick={() => (isPloggingPage ? onCancel() : navigate(-1))}>
        <BackIcon width="30" height="30" />
      </H.BackButton>
      {/* ✅ /plogging 페이지에서는 검색창과 검색 버튼만 표시 */}
      {isPloggingPage ? (
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
