import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import * as S from "./styledMyPage";

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

        const response = await fetch(
          `${API_BASE_URL}/api/mypage?userId=${parsedUser.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log("📌 MyPage 데이터:", data);

        setPoint(data.point);
        setPetName(data.petName);
        setProfileImg(data.profileImg || "/images/defaultPet.svg");
      } catch (error) {
        console.error("❌ MyPage 데이터 로딩 오류:", error.message);
      }
    };

    fetchMyPageData();
  }, [parsedUser]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const goToCorrectPage = () => navigate("/correct");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { Icon: S.HomeIcon, path: "/home" },
    { Icon: S.CommuIcon, path: "/community" },
    { Icon: S.FlagIcon, path: "/plogging" },
    { Icon: S.MyPageIcon, path: "/mypage" },
  ];

  return (
    <>
      <S.Container>
        <S.Header>
          <S.BackButton onClick={() => navigate(-1)} />
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
          <S.ExpandMenu>
            <S.ExpandItem onClick={goToCorrectPage}>
              회원 정보 수정하기
            </S.ExpandItem>
            <S.ExpandItem>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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
          <S.Tab selected>
            나의<S.BoldText> 멍로깅 기록</S.BoldText>
          </S.Tab>
          <S.Tab
            style={{ marginLeft: "-60px" }}
            onClick={() => navigate(`/mypage2`)}
          >
            커뮤니티<S.BoldText> 작성 기록</S.BoldText>
          </S.Tab>
        </S.Tabs>
        <S.MapContainer>
          {logs.map((log) => (
            <div key={log.verificationId}>
              <S.RecordDate>{log.date}</S.RecordDate>
              <S.MapImage
                src={log.uploadedImages[0] || "/images/exMap1.svg"}
                alt="Map"
              />
              <S.RecordTitle>{log.courseName}</S.RecordTitle>
            </div>
          ))}
        </S.MapContainer>
      </S.Container>

      <S.Footer>
        {menuItems.map((item, index) => (
          <S.NavItem key={index} onClick={() => navigate(item.path)}>
            <item.Icon />
          </S.NavItem>
        ))}
      </S.Footer>
    </>
  );
};

export default MyPage;
