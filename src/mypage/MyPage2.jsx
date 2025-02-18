import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styledMyPage2";

const MyPage2 = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false); // 버튼 리스트의 표시 여부
  const [profileImg, setProfileImg] = useState("/images/defaultPet.svg"); // 프로필 이미지 상태

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev); // 클릭할 때마다 토글
  };

  const go1 = () => {
    navigate(`/mypage`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result); // 선택한 파일을 프로필 이미지로 설정
      };
      reader.readAsDataURL(file);
    }
  };

  const goToCorrectPage = () => {
    navigate("/correct"); // 회원 정보 수정 페이지로 이동
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
          <S.ProfileName>춘식이</S.ProfileName>
          <S.Points>
            <S.PointText>150P</S.PointText>
            <S.RewardButton />
          </S.Points>
        </S.ProfileCard>

        {/* 버튼 리스트 - isExpanded 상태에 따라 표시 */}
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
          <S.Tab onClick={go1}>
            나의
            <S.BoldText> 멍로깅 기록</S.BoldText>
          </S.Tab>
          <S.Tab style={{ marginLeft: "-60px" }} selected>
            커뮤니티
            <S.BoldText> 작성 기록</S.BoldText>
          </S.Tab>
        </S.Tabs>

        <S.MapContainer>
          <S.MapImage src="/images/dog1.svg" alt="Map" />
          <S.MapImage src="/images/dog2.svg" alt="Map" />
          <S.MapImage src="/images/dog1.svg" alt="Map" />
          <S.MapImage src="/images/dog2.svg" alt="Map" />
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

export default MyPage2;
