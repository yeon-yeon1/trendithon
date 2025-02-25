import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 393px;
  height: auto;
  /* background: rgba(122, 220, 219, 0.10); */
  background: #E9F3F3;
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
    left: 58%;
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
    height: auto;
`;

export const CommuProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #D9D9D9;
    /* background: url(<path-to-image>) lightgray 1px -1.649px / 100% 94.595% no-repeat; */
    /* margin-top: 18px;
    margin-left: 21px; */
`;

export const UserNickname = styled.p`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px; /* 113.333% */
    margin: 0;
    margin-bottom: 3px;
`;

export const PostLocation = styled.p`
    color: #AAA;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0;
`;

export const PostDate = styled.p`
    color: #AAA;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    margin-bottom: 10px;
    /* margin-left: auto; */
`;

export const CircleButton = styled.button`
    width: 26px;
    height: 7.091px;
    border: none;
    cursor: pointer;
    background-image: url("/images/CommuCircleButton.svg");
    background-color: transparent;
    /* background-size: contain;
    background-repeat: no-repeat;
    background-position: center; */
    /* position: absolute;
    z-index: 10; */
    margin-left: auto;
`;

export const CommuMenu = styled.div`
    width: 131px;
    height: 61px;
    border: 1px solid #7ADCDB;
    background: #FFF;
`;

export const CommuDeleteButton = styled.button`
    width: 131px;
    height: 61px;
    left: 0;
    top: 0;
    position: absolute;
    /* background: white; */
    border: none;
    color: #7ADCDB;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
`;

export const CommuEditButton = styled.button`
    width: 131px;
    height: 0;
    left: 0;
    top: 30;
    position: absolute;
    border-top: 1px #7ADCDB solid;
    color: #7ADCDB;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
`;

export const PostImageBox = styled.div`
    width: 359px;
    height: 200px;
    border: 1px solid #AAA;
    margin: 13px 17px;
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
    padding: 0 20px;
    width: 353px;
    /* height: 34px; */
    /* display: block;
    overflow: hidden;
    text-overflow: ellipsis; */
    /* white-space: nowrap; */
`;

export const PostInfo = styled.div`
    display: flex;
    margin-bottom: 14px;
    margin-top: 25px;
`;

export const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    margin-right: 5px;

    img {
        width: 19px;
        height: 19px;
    }
`;

export const CommentIcon = styled.div`
    background-image: url("/images/CommentIcon.svg");
    width: 19px;
    height: 19px;
    margin-left: 16px;
    margin-right: 6px;
`;