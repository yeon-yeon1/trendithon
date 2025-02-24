import React, { useEffect } from "react";
import * as W from "./styledWelcome";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const timeout = () => {
    setTimeout(() => {
      navigate("/splash");
    }, 1800);
  };

  useEffect(() => {
    timeout();

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      <W.Container>
        <W.Image src="/images/Character.svg" />
        <W.WelcomeP>환영합니다</W.WelcomeP>
      </W.Container>
    </>
  );
};

export default Welcome;
