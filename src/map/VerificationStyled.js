import styled from "styled-components";
import * as M from "../map/mapStyled.js"; // ✅ 기존 스타일 불러오기

// ✅ 전체 페이지 컨테이너
export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #e9f3f3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// ✅ 플로깅 코스 이름
export const CourseName = styled.div`
  width: 85%;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 20px;
  padding: 10px;
  text-align: center;
  border: 1px solid #7adcdb;
  border-radius: 30px;
  background-color: #ffffff;
`;

// ✅ 지도 컨테이너
export const MapWrapper = styled.div`
  width: 90%;
  height: 350px;
  background: #ccc;
  padding: 5px 20px;
  border-radius: 10px;
  border: none;
  background: #e9f3f3;
`;

// ✅ 기존 M.MapWrapper 스타일을 확장하여 새로운 스타일 추가
export const ExtendedMapWrapper = styled(M.MapWrapper)`
  width: 361px;
  height: 100%;
  border: 1px solid #ddd;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
`;

// ✅ 사진 업로드 영역
export const PhotoUpload = styled.div`
  width: 90%;
  height: 200px;
  border: 1px solid #ddd;
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 20px;
  text-align: center;
`;

// ✅ 업로드 아이콘
export const UploadIcon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

// ✅ 업로드 텍스트
export const UploadText = styled.div`
  font-size: 14px;
  color: #777;
`;

// ✅ 가이드라인 div
export const GuidelineWrapper = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  width: 90%;
  padding: 5px 0px;
  padding-bottom: 10px;
  background-color: #7adcdb;
  border-radius: 5px;
  margin: 0 20px;
  margin-top: 15px;
`;

// ✅ 가이드라인 텍스트
export const Guideline = styled.p`
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  padding-right: 43px;
`;

// ✅ 가이드라인 버튼
export const GuideButton = styled.button`
  position: absolute;
  width: 75px;
  height: 23px;
  color: #6ad0cf;
  font-size: 11px;
  font-weight: bold;
  margin-top: 38px;
  margin-right: 13px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.31) 67.67%, rgba(122, 220, 219, 0.31) 100%);
`;

// ✅ 인증하기 버튼
export const VerifyButton = styled.button`
  width: 154.154px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 46.154px;
  background: var(--gradient, linear-gradient(103deg, #d1ffd8 0.12%, #7adcdb 99.88%));
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  margin-top: 0;
  margin-left: 120px;
`;
