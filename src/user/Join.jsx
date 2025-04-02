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

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    email: "",
    nickname: "",
    petName: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJoin = async () => {
    setError(null); // ✅ 기존 에러 초기화

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("회원가입 요청 실패");
      }

      const result = await response.text(); // 응답 데이터 받기
      console.log("✅ 회원가입 응답:", result);

      alert("회원가입이 완료되었습니다!");

      // 회원가입 성공 시 로그인 페이지로 이동하도록 설정 함. 나중에 수정해도 됨.
      navigate("/login");
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      setError("회원가입에 실패했습니다. 다시 시도해주세요."); // ✅ 에러 메시지 설정
    }
  };

  return (
    <>
      <J.Container>
        <Header />

        {/* 밑 코드는 기존 코드, 윗 코드는 헤더 파일 따로 빼 놓은 상태. 나중에 뭘로 할 지 결정 후 하나는 삭제 필요 */}

        {/* <J.JoinHeader>
          <Link to="/login">
            <J.BackIcon src="/images/BackIcon.svg" />
          </Link>
          <J.JoinTitle>회원가입</J.JoinTitle>
        </J.JoinHeader> */}
        <J.NameTag color="#7ADCDB" size="15px" $NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>아이디</J.NameTag>
        <J.InputBox placeholder="아이디를 입력하세요" name="userId" value={formData.userId} onChange={handleChange} />
        <J.NameTag color="#7ADCDB" size="15px" $NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>비밀번호</J.NameTag>
        <J.InputBox
          placeholder="비밀번호를 입력하세요"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <J.NameTag color="#7ADCDB" size="15px" $NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>이메일</J.NameTag>
        <J.InputBox placeholder="이메일을 입력하세요" name="email" value={formData.email} onChange={handleChange} />
        <J.NameTag color="#7ADCDB" size="15px" $NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>닉네임</J.NameTag>
        <J.InputBox
          placeholder="닉네임을 입력하세요"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        <J.NameTag color="#7ADCDB" size="15px" $NameTagML="34px">
          *
        </J.NameTag>
        <J.NameTag>반려견 이름</J.NameTag>
        <J.InputBox
          placeholder="반려견 이름을 입력하세요"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
        />
        <J.JoinBtn onClick={handleJoin}>회원가입 완료</J.JoinBtn>
      </J.Container>
    </>
  );
};

export default Join;
