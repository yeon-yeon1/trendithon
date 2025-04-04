import React, { useState } from "react";
import * as L from "../user/styledLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  //   const handleLogin = () => {
  //     navigate("/home");
  //   };

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ JSON 형식 명확히 지정
        },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const result = await response.text();
      console.log("✅ 로그인 응답:", result);
      // ✅ 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem("user", JSON.stringify(result));
      // ✅ 전역 상태 업데이트
      login(result);
      navigate("/welcome");
      // 안내 페이지? 랜딩 페이지 추가 시 이쪽으로 들어가면 됨.
    } catch (error) {
      console.error("❌ 로그인 실패:", error);
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
      alert("아이디와 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <>
      <L.Container>
        <L.Image src="/images/Character.svg" />
        <L.Logo>멍로깅</L.Logo>

        <L.InputBox
          $inputBoxMt="24px"
          placeholder="아이디"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
        <L.InputBox
          $inputBoxMt="8px"
          placeholder="비밀번호"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <L.LoginBtn onClick={handleLogin}>로그인</L.LoginBtn>

        <L.SmallLogo>
          멍로깅 | <L.JoinLink to="/join">회원가입</L.JoinLink>
        </L.SmallLogo>
      </L.Container>
    </>
  );
};

export default Login;
