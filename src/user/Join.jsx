import React, { useState } from "react";
import * as J from "../user/styledJoin";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Join = () => {
  const navigate = useNavigate();

  //   const handleJoin = () => {
  //     navigate("/welcome");
  //   };

  // ✅ 사용자 입력값을 저장할 상태 추가
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    email: "",
    nickname: "",
    petName: "",
  });

  const [error, setError] = useState(null); // ✅ 에러 메시지 상태 추가

  // ✅ 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ 회원가입 요청 핸들러
  const handleJoin = async () => {
    setError(null); // ✅ 기존 에러 초기화

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✅ 입력 데이터 전송
      });

      if (!response.ok) {
        throw new Error("회원가입 요청 실패");
      }

      const result = await response.text(); // 응답 데이터 받기
      console.log("✅ 회원가입 응답:", result);

      alert("회원가입이 완료되었습니다!");
      navigate("/welcome"); // ✅ 회원가입 성공 시 웰컴 페이지로 이동
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      setError("회원가입에 실패했습니다. 다시 시도해주세요."); // ✅ 에러 메시지 설정
    }
  };

  return (
    <>
      <J.Container>
        <Header />
        {/* <J.JoinHeader>
          <Link to="/login">
            <J.BackIcon src="/images/BackIcon.svg" />
          </Link>
          <J.JoinTitle>회원가입</J.JoinTitle>
        </J.JoinHeader> */}
        <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>아이디</J.NameTag>
        <J.InputBox placeholder="아이디를 입력하세요" />
        <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>비밀번호</J.NameTag>
        <J.InputBox placeholder="비밀번호를 입력하세요" />
        <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>이메일</J.NameTag>
        <J.InputBox placeholder="이메일을 입력하세요" />
        <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>닉네임</J.NameTag>
        <J.InputBox placeholder="닉네임을 입력하세요" />
        <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>반려견 이름</J.NameTag>
        <J.InputBox placeholder="반려견 이름을 입력하세요" />
        alert({error})<J.JoinBtn onClick={handleJoin}>회원가입 완료</J.JoinBtn>
      </J.Container>
    </>
  );
};

export default Join;
