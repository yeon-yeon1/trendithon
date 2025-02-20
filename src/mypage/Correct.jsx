import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../mypage/styledCorrect";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    { Icon: C.HomeIcon, path: "/home" },
    { Icon: C.CommuIcon, path: "/community" },
    { Icon: C.FlagIcon, path: "/plogging" },
    { Icon: C.MyPageIcon, path: "/mypage" },
  ];

  return (
    <>
      <C.Container>
        <C.Header>
          <C.BackButton onClick={() => navigate(-1)} />
          <C.Title>회원정보 수정</C.Title>
        </C.Header>

        {/* 회원 정보 입력 폼 */}
        <C.FormContainer>
          <C.Label>아이디</C.Label>
          <C.InputField type="text" value="alefjlwkjf" disabled />

          <C.Label>비밀번호 수정</C.Label>
          <C.InputField type="password" placeholder="비밀번호를 입력하세요" />

          <C.Label>이메일</C.Label>
          <C.InputField type="email" value="qlkfjlsdk@naver.com" disabled />

          <C.Label>닉네임 수정</C.Label>
          <C.InputField type="text" placeholder="닉네임을 입력하세요" />

          <C.Label>반려견 이름 수정</C.Label>
          <C.InputField type="text" placeholder="반려견 이름을 입력하세요" />
        </C.FormContainer>
        <C.CompleteBtn />
      </C.Container>

      <C.Footer>
        {menuItems.map((item, index) => (
          <C.NavItem key={index} onClick={() => navigate(item.path)}>
            <item.Icon />
          </C.NavItem>
        ))}
      </C.Footer>
    </>
  );
};

export default Home;
