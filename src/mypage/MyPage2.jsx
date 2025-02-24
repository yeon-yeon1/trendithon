import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import * as S from "./styledMyPage2";

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

        const response = await fetch(
          `${API_BASE_URL}/api/mypage?userId=${parsedUser.userId}`
        );
        if (!response.ok)
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);

        const data = await response.json();
        setPetName(data.petName);
        setPoint(data.point);
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

        const response = await fetch(
          `${API_BASE_URL}/api/mypage/posts?userId=${parsedUser.userId}`
        );
        if (!response.ok)
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("❌ 커뮤니티 작성 기록 로딩 오류:", error.message);
      }
    };

    fetchPosts();
  }, [parsedUser]);

  return (
    <>
      <S.Container>
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
          <S.ExpandMenu>
            <S.ExpandItem onClick={() => navigate("/correct")}>
              회원 정보 수정하기
            </S.ExpandItem>
            <S.ExpandItem>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setProfileImg(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                style={{ cursor: "pointer", color: "#7adcdb" }}
              >
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
            <S.MapImage
              key={post.postId}
              src={post.imageUrl || "/images/defaultPost.svg"}
              alt="Post"
            />
          ))}
        </S.MapContainer>
      </S.Container>

      <S.Footer>
        {[
          { Icon: S.HomeIcon, path: "/home" },
          { Icon: S.CommuIcon, path: "/community" },
          { Icon: S.FlagIcon, path: "/plogging" },
          { Icon: S.MyPageIcon, path: "/mypage" },
        ].map((item, index) => (
          <S.NavItem key={index} onClick={() => navigate(item.path)}>
            <item.Icon />
          </S.NavItem>
        ))}
      </S.Footer>
    </>
  );
};

export default MyPage2;
