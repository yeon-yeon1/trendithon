import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js"; // 로그인된 유저 정보 가져오기
import * as C from "../mypage/styledCorrect";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Correct = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 🔹 로그인된 유저 정보 가져오기
  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    email: "",
    nickname: "",
    petName: "",
  });

  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터가 로딩되었는지 체크하는 상태

  // ✅ 마이페이지 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!parsedUser || !parsedUser.userId || isDataLoaded) return; // 데이터가 이미 로드되었으면 다시 호출 안 함

        const response = await fetch(
          `${API_BASE_URL}/api/mypage?userId=${parsedUser.userId}`
        );
        if (!response.ok)
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);

        const data = await response.json();
        setFormData({
          userId: data.userId || "",
          password: "", // 비밀번호는 수정할 수 없다고 가정
          email: data.email || "",
          nickname: data.nickname || "",
          petName: data.petName || "",
        });

        setIsDataLoaded(true); // 데이터가 로드되었음을 표시
        setLoading(false); // 로딩 상태 false로 설정
      } catch (error) {
        console.error("❌ 회원 정보 불러오기 오류:", error.message);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [parsedUser, isDataLoaded]); // parsedUser가 변경될 때만 호출

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // 비밀번호가 입력되지 않았으면 해당 필드 제외
      const bodyData = {
        userId: formData.userId, // 쿼리 파라미터로 전달되어야 할 수 있음
        nickname: formData.nickname,
        petName: formData.petName,
        email: formData.email, // 이메일도 포함해야 할 수 있음
      };

      // 비밀번호가 비어있지 않으면 요청 본문에 포함
      if (formData.password.trim() !== "") {
        bodyData.password = formData.password;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/mypage?userId=${formData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 필요한 경우 Authorization 헤더 추가
            // "Authorization": `Bearer ${yourToken}`
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(
          `HTTP 오류! 상태 코드: ${response.status}, 메시지: ${
            responseData.message || "알 수 없는 오류"
          }`
        );
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

  // 데이터가 로딩 중일 때 로딩 화면 표시
  if (loading) {
    return <div>Loading...</div>;
  }

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
            value={formData.nickname}
            onChange={handleChange}
          />

          <C.Label>반려견 이름 수정</C.Label>
          <C.InputField
            type="text"
            name="petName"
            placeholder="반려견 이름을 입력하세요"
            value={formData.petName}
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
