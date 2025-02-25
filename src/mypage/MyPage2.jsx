import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import * as S from "./styledMyPage2";
import Footer from "../components/Footer"; //푸터

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MyPage2 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const parsedUser = typeof user === "string" ? JSON.parse(user) : user;

  const [isExpanded, setIsExpanded] = useState(false);
  const [profileImg, setProfileImg] = useState("/images/defaultPet.svg");
  const [posts, setPosts] = useState([]); // 게시글 데이터
  const [petName, setPetName] = useState(""); // 🐶 petName 추가
  const [point, setPoint] = useState(0); // 💰 point 추가

  // 📝 1. 마이페이지 정보 (petName, point) 가져오기
  useEffect(() => {
    const fetchMyPageInfo = async () => {
      try {
        if (!parsedUser || !parsedUser.userId) return;

        const response = await fetch(`${API_BASE_URL}/api/mypage?userId=${parsedUser.userId}`);
        if (!response.ok) throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);

        const data = await response.json();
        setPetName(data.petName);
        setPoint(data.point);
        setProfileImg(data.profileImg || "/images/defaultPet.svg"); // 서버에서 받은 프로필 이미지 설정
      } catch (error) {
        console.error("❌ 마이페이지 정보 로딩 오류:", error.message);
      }
    };

    fetchMyPageInfo();
  }, [parsedUser]);

  // 📝 2. 커뮤니티 작성 기록 (posts) 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!parsedUser || !parsedUser.userId) return;

        const response = await fetch(`${API_BASE_URL}/api/mypage/posts?userId=${parsedUser.userId}`);
        if (!response.ok) throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("❌ 커뮤니티 작성 기록 로딩 오류:", error.message);
      }
    };

    fetchPosts();
  }, [parsedUser]);

  // 프로필 사진 변경 처리
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const previewImage = reader.result;
        setProfileImg(previewImage); // 미리보기 이미지 업데이트

        // FormData에 파일과 userId 포함해서 서버로 전송
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

          // 서버에서 반환된 새로운 프로필 이미지 URL로 상태 업데이트
          const data = await response.json();
          setProfileImg(data.profileImg); // 서버에서 반환된 프로필 이미지로 상태 업데이트
          console.log("✅ 프로필 이미지 변경 완료");
        } catch (error) {
          console.error("❌ 프로필 이미지 변경 오류:", error.message);
          setProfileImg("/images/defaultPet.svg"); // 실패 시 기본 이미지로 되돌리기
        }
      };

      reader.readAsDataURL(file); // 선택한 이미지를 읽어서 미리보기 표시
    }
  };

  return (
    <>
      <S.Container onClick={() => isExpanded && setIsExpanded(false)}>
        <S.Header>
          <S.BackButton onClick={() => navigate(-1)} />
          <S.Title>마이페이지</S.Title>
        </S.Header>

        <S.ProfileCard>
          <S.ProfileContainer />
          <S.ExpandBtn onClick={() => setIsExpanded((prev) => !prev)} />
          <S.ProfileImage src={profileImg} alt="Profile" />
          <S.ProfileName>{petName}</S.ProfileName> {/* 🐶 petName 적용 */}
          <S.Points>
            <S.PointText>{point}P</S.PointText> {/* 💰 point 적용 */}
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
            <S.ExpandItem onClick={() => navigate("/correct")}>회원 정보 수정하기</S.ExpandItem>
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
          <S.Tab onClick={() => navigate(`/mypage`)}>
            나의<S.BoldText> 멍로깅 기록</S.BoldText>
          </S.Tab>
          <S.Tab style={{ marginLeft: "-60px" }} selected>
            커뮤니티<S.BoldText> 작성 기록</S.BoldText>
          </S.Tab>
        </S.Tabs>

        <S.MapContainer>
          {posts.map((post) => (
            <S.MapImage key={post.postId} src={post.imageUrl || "/images/defaultPost.svg"} alt="Post" />
          ))}
        </S.MapContainer>
      </S.Container>

      <Footer />
    </>
  );
};

export default MyPage2;
