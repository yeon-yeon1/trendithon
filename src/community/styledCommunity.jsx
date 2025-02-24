import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: 852px;
  background: rgba(122, 220, 219, 0.10);
  min-height: 100vh; /* 화면 크기에 맞게 자동 조절 */
  border: 1px solid #e3e3e3; /* 화면 구분선, 추후 삭제해도 됨 */
`;

export const JoinHeader = styled.div`
    width: 393px;
    height: 70px;
    display: flex;
    border-bottom: 1px solid #FFF;
`;

export const WriteIcon = styled.img`
    width: 60px;
    height: 60px;
    position: fixed;
    top: 80%;
    left: 56.5%;
`;

export const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const PostItem = styled.div`
    /* border: 1px solid black; */
    /* padding: 15px; */
    background: #fff;
    width: 393px;
    height: 384px;
`;

export const PostImageBox = styled.div`
    width: 359px;
    height: 200px;
    border: 1px solid #AAA;
    margin: 0 17px;
    background: url(<path-to-image>) lightgray 50% / cover no-repeat;
    overflow: hidden;
`;

export const PostImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const PostContent = styled.p`
    /* font-size: 14px;
    color: #333;
    margin: 10px 0; */

    color: #000;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px; /* 141.667% */
`;

export const PostInfo = styled.div`
    font-size: 12px;
    color: #777;
    display: flex;
    justify-content: space-between;
`;
