import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AdminList from "./components/AdminList";
import * as A from "./AdminStyled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Admin = () => {
  const [verificationData, setVerificationData] = useState([]);
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
        setVerificationData(data);
      } catch (error) {
        console.error("🚨 데이터 불러오기 실패:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchVerificationData();
  }, []);

  // useEffect(() => {
  //   if (!user || user.role !== "ROLE_ADMIN") {
  //     alert("관리자 권한이 필요합니다.");
  //     navigate("/login");
  //     return;
  //   }

  //   const fetchVerificationData = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/api/verification`);

  //       if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

  //       const data = await response.json();
  //       setVerificationData(data);
  //     } catch (error) {
  //       console.error("🚨 데이터 불러오기 실패:", error);
  //       setError("데이터를 불러오는 중 오류가 발생했습니다.");
  //     }
  //   };

  //   fetchVerificationData();
  // }, [user, navigate]);

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
