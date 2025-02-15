import React from "react";
import * as L from "../user/styledLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/home");
    };

    return (
        <>
            <L.Container>
                <L.Image src="/images/Character.svg" />
                <L.Logo>멍로깅</L.Logo>

                <L.InputBox inputBoxMt='24px' placeholder="아이디" />
                <L.InputBox inputBoxMt='8px' placeholder="비밀번호" />
                <L.LoginBtn onClick={handleLogin}>로그인</L.LoginBtn>
                
                <L.SmallLogo>
                    멍로깅 | <L.JoinLink to="/join">회원가입</L.JoinLink>
                </L.SmallLogo>
            </L.Container>
        </>
    );
}

export default Login;