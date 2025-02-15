import React from "react";
import * as J from "../user/styledJoin";
import { Link, useNavigate } from "react-router-dom";

const Join = () => {
    const navigate = useNavigate();

    const handleJoin = () => {
        navigate("/welcome");
    };

    return (
        <>
            <J.Container>
                <J.JoinHeader>
                    <Link to="/login">
                        <J.BackIcon src="/images/BackIcon.svg" />
                    </Link>
                    <J.JoinTitle>회원가입</J.JoinTitle>
                </J.JoinHeader>

                <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">*</J.NameTag>
                <J.NameTag>아이디</J.NameTag>
                <J.InputBox placeholder="아이디를 입력하세요"/>

                <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">*</J.NameTag>
                <J.NameTag>비밀번호</J.NameTag>
                <J.InputBox placeholder="비밀번호를 입력하세요"/>

                <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">*</J.NameTag>
                <J.NameTag>이메일</J.NameTag>
                <J.InputBox placeholder="이메일을 입력하세요"/>

                <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">*</J.NameTag>
                <J.NameTag>닉네임</J.NameTag>
                <J.InputBox placeholder="닉네임을 입력하세요"/>

                <J.NameTag color="#7ADCDB" size="15px" NameTagML="34px">*</J.NameTag>
                <J.NameTag>반려견 이름</J.NameTag>
                <J.InputBox placeholder="반려견 이름을 입력하세요"/>

                <J.JoinBtn onClick={handleJoin}>회원가입 완료</J.JoinBtn>
            </J.Container>
        </>
    );
}

export default Join;