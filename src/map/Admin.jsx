import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AdminList from "./components/AdminList";
import * as A from "./AdminStyled";

const Admin = () => {
  const [verificationData, setVerificationData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("verificationData")) || [];
    setVerificationData(storedData);
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
