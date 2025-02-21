import React, { createContext, useContext, useEffect, useState } from "react";

// ✅ AuthContext 생성
const AuthContext = createContext();

// ✅ AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ 애플리케이션이 시작될 때 로컬 스토리지에서 사용자 정보를 가져옴
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // ✅ JSON 파싱해서 상태 업데이트
    }
  }, []);

  // ✅ 로그인 함수: 로컬 스토리지와 상태에 사용자 정보를 저장
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ 로컬 스토리지에 저장
  };

  // ✅ 로그아웃 함수: 로컬 스토리지에서 사용자 정보 제거
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ 로컬 스토리지에서 제거
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// ✅ useAuth 훅: AuthContext 사용을 더 쉽게 만들어줌
export const useAuth = () => {
  return useContext(AuthContext);
};
