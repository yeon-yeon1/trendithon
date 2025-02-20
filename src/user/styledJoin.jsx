import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: #fff;
  min-height: 100vh; /* 화면 크기에 맞게 자동 조절 */
  border: 1px solid #e3e3e3; /* 화면 구분선, 추후 삭제해도 됨 */
`;

export const JoinHeader = styled.div`
  width: 393px;
  height: 70px;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  margin-bottom: 62.98px;
`;

export const BackIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 28px;
  margin-left: 23px;
`;

export const JoinTitle = styled.p`
  color: #000;
  // font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 31px;
  margin-left: 109px;
`;

// 밑 코드가 사파리 이용할 때(맥에서만 문제되는 거 같음) warning이 떠서 일단 주석 처리 해놓고 다른 코드 썼는데 나중에 다시 바꿔도 됨
// 만약에 바꾼다면 jsx 파일 들어가서 $NameTagML여기서 $ 없애야 함.

// export const NameTag = styled.span`
//   color: ${(props) => (props.color ? props.color : "#000")};
//   font-size: ${(props) => (props.size ? props.size : "12px")};
//   margin-left: ${(props) => (props.NameTagML ? props.NameTagML : "0px")};
//   //   font-family: "Pretendard Variable";
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
// `;

export const NameTag = styled.span`
  color: ${(props) => props.color || "#000"};
  font-size: ${(props) => props.size || "12px"};
  margin-left: ${(props) => props.$NameTagML || "0px"}; // ✅ $ 사용
  // font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const InputBox = styled.input`
  width: 312px;
  height: 39px;
  border-radius: 50px;
  border: 1px solid #e3e3e3;
  background: #fff;
  //   font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 13px;
  margin-bottom: 20px;
  margin-left: 28px;
  padding-left: 20px;

  &::placeholder {
    color: #aaa;
    // font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &:focus {
    outline: none;
  }
`;

export const JoinBtn = styled.button`
  width: 340px;
  height: 65px;
  border-radius: 50px;
  border: none;
  background: linear-gradient(103deg, #d1ffd8 0.12%, #7adcdb 99.88%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  //   font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 25px;
  margin-top: 110px;
`;
