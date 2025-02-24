import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../mypage/styledCorrect";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Correct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "alefjlwkjf", // 예제 아이디, 실제 데이터와 연동 필요
    password: "",
    email: "qlkfjlsdk@naver.com", // email 필드는 수정할 수 없다고 가정하고 기본값 유지
    nickname: "",
    petName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/mypage?userId=${encodeURIComponent(
          formData.userId
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.password,
            email: formData.email, // email은 수정 안 되는 값일 수 있음
            nickname: formData.nickname,
            petName: formData.petName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
      }

      console.log("✅ 회원 정보 수정 완료");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("❌ 회원 정보 수정 오류:", error.message);
    }
  };

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
          <C.InputField type="text" value={formData.userId} disabled />

          <C.Label>비밀번호 수정</C.Label>
          <C.InputField
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleChange}
          />

          <C.Label>이메일</C.Label>
          <C.InputField type="email" value={formData.email} disabled />

          <C.Label>닉네임 수정</C.Label>
          <C.InputField
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            onChange={handleChange}
          />

          <C.Label>반려견 이름 수정</C.Label>
          <C.InputField
            type="text"
            name="petName"
            placeholder="반려견 이름을 입력하세요"
            onChange={handleChange}
          />
        </C.FormContainer>
        <C.CompleteBtn onClick={handleSubmit} />
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

export default Correct;
