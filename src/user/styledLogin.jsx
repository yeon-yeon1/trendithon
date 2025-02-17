import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  min-height: 932px;
  background: #7adcdb;
  //   min-height: 100vh; /* 화면 크기에 맞게 자동 조절 */
`;

export const Image = styled.img`
  width: 299px;
  height: 254px;
  margin-top: 111px;
  margin-left: 60px;
`;

export const Logo = styled.div`
  color: #fff;
  // font-family: "Pretendard Variable";
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

export const InputBox = styled.input`
  width: 310px;
  height: 57px;
  background: #fff;
  border-radius: 50px;
  border: 1px solid #fff;
  margin-top: ${(props) => props.inputBoxMt};
  margin-left: 25px;
  padding-left: 30px;
  //   font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &::placeholder {
    color: #aaa;
    // font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  &:focus {
    outline: none;
  }
`;

export const LoginBtn = styled.button`
  width: 340px;
  height: 65px;
  border-radius: 50px;
  background: linear-gradient(103deg, #d1ffd8 0.12%, #7adcdb 99.88%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: #fff;
  //   font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 17px;
  margin-left: 25px;
`;

export const SmallLogo = styled.p`
  color: #fff;
  //   font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  margin-top: 21px;
`;

export const JoinLink = styled(Link)`
  color: #fff;
  //   font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration: none;
  margin-left: 4px;
`;
