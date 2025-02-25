import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import * as S from "./styledMyPage";
import Footer from "../components/Footer"; //푸터

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;

  const [isExpanded, setIsExpanded] = useState(false);
  const [profileImg, setProfileImg] = useState("/images/defaultPet.svg");
  const [petName, setPetName] = useState("");
  const [point, setPoint] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchMyPageData = async () => {
      try {
        if (!parsedUser || !parsedUser.userId) {
          console.error("🚨 사용자 정보가 없습니다. 로그인 필요");
          return;
        }

        // 📌 마이페이지 기본 데이터 가져오기
        const response1 = await fetch(`${API_BASE_URL}/api/mypage?userId=${parsedUser.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response1.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response1.status}`);
        }

        const data1 = await response1.json();

        setPoint(data1.point);
        setPetName(data1.petName);
        setProfileImg(data1.profileImg || "/images/defaultPet.svg");

        // 📌 멍로깅 기록 가져오기 (연동 변경됨)
        const response2 = await fetch(`${API_BASE_URL}/api/verification/user/${parsedUser.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response2.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response2.status}`);
        }

        const data2 = await response2.json();

        // logs 상태에 데이터 설정
        setLogs(data2);
      } catch (error) {
        console.error("❌ 데이터 로딩 오류:", error.message);
      }
    };

    fetchMyPageData();
  }, [parsedUser]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const goToCorrectPage = () => navigate("/correct");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // 1. 선택된 이미지를 바로 미리보기
      const reader = new FileReader();
      reader.onloadend = async () => {
        const previewImage = reader.result;
        setProfileImg(previewImage); // 미리보기 이미지 바로 반영

        // 2. 프로필 사진 서버에 업로드
        const formData = new FormData();
        formData.append("profile", file);
        formData.append("userId", parsedUser.userId);

        try {
          const response = await fetch(`${API_BASE_URL}/api/mypage`, {
            method: "PATCH",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          });

          if (!response.ok) {
            const responseData = await response.json();
            throw new Error(
              `HTTP 오류! 상태 코드: ${response.status}, 메시지: ${responseData.message || "알 수 없는 오류"}`
            );
          }

          // 서버에서 프로필 이미지 변경 후 성공적으로 반영되면
          const data = await response.json();
          setProfileImg(data.profileImg); // 서버에서 반환된 새로운 프로필 이미지로 업데이트
          console.log("✅ 프로필 이미지 변경 완료");
        } catch (error) {
          console.error("❌ 프로필 이미지 변경 오류:", error.message);
          // 실패한 경우 미리보기 이미지를 되돌릴 수 있습니다.
          setProfileImg("/images/defaultPet.svg"); // 실패 시 기본 이미지로 되돌리기
        }
      };

      reader.readAsDataURL(file); // 선택한 이미지를 읽어서 미리보기 표시
    }
  };

  // 📌 클릭 시 MyRecord 페이지로 이동
  const handleCourseClick = (verificationId) => {
    navigate(`/record/${verificationId}`); // URL에 verificationId 추가
  };

  return (
    <>
      <S.Container onClick={() => isExpanded && setIsExpanded(false)}>
        <S.Header>
          <S.BackButton onClick={() => navigate("/home")} />
          <S.Title>마이페이지</S.Title>
        </S.Header>
        <S.ProfileCard>
          <S.ProfileContainer />
          <S.ExpandBtn onClick={toggleExpand} />
          <S.ProfileImage src={profileImg} alt="Profile" />
          <S.ProfileName>{petName}</S.ProfileName>
          <S.Points>
            <S.PointText>{point}P</S.PointText>
            <S.RewardButton onClick={() => navigate("/reward")} />
          </S.Points>
        </S.ProfileCard>
        {isExpanded && (
          <S.ExpandMenu
            onClick={(e) => {
              e.stopPropagation(); // ✅ 메뉴 아이콘 클릭 시 메뉴가 닫히지 않게 함
              setIsExpanded((prev) => !prev);
            }}
          >
            <S.ExpandItem onClick={goToCorrectPage}>회원 정보 수정하기</S.ExpandItem>
            <S.ExpandItem>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={{ cursor: "pointer", color: "#7adcdb" }}>
                프로필 사진 지정하기
              </label>
            </S.ExpandItem>
          </S.ExpandMenu>
        )}
        <S.Tabs>
          <S.Tab selected>
            나의<S.BoldText> 멍로깅 기록</S.BoldText>
          </S.Tab>
          <S.Tab style={{ marginLeft: "-60px" }} onClick={() => navigate(`/mypage2`)}>
            커뮤니티<S.BoldText> 작성 기록</S.BoldText>
          </S.Tab>
        </S.Tabs>
        <S.MapContainer>
          {logs.map((log) => (
            <div key={log.verificationId} onClick={() => handleCourseClick(log.verificationId)}>
              <S.RecordDate>{log.date}</S.RecordDate>
              <S.MapImage src={log.uploadedImages[0] || "/images/exMap1.svg"} alt="Map" />
              <S.RecordTitle>{log.courseName}</S.RecordTitle>
            </div>
          ))}
        </S.MapContainer>
      </S.Container>
      <Footer />
    </>
  );
};

export default MyPage;
