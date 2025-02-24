import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AdminList from "./components/AdminList";
import * as A from "./AdminStyled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Admin = () => {
  const [verificationData, setVerificationData] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // ✅ 이미지 배열 상태 추가
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerificationData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/verification`);

        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        console.log("✅ 불러온 데이터:", data);

        setVerificationData(data);

        // 이미지 배열이 존재하면 상태에 추가
        if (data.uploadedImages && Array.isArray(data.uploadedImages)) {
          setUploadedImages(data.uploadedImages); // ✅ 이미지 배열 상태에 추가
        }
      } catch (error) {
        console.error("🚨 데이터 불러오기 실패:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchVerificationData();
  }, []);

  return (
    <>
      <A.Container>
        <Header />
        <A.Subtitle>목록</A.Subtitle>
        {verificationData.length === 0 ? (
          <p style={{ display: "flex", justifyContent: "center" }}>저장된 데이터가 없습니다.</p>
        ) : (
          <AdminList verificationData={verificationData} />
        )}
      </A.Container>
    </>
  );
};

export default Admin;
