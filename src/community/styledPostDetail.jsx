import styled from "styled-components";

export const PostDetailTitle = styled.div`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 31px;
    margin-left: 97px;
`;

export const CommentList = styled.div`
    width: 393px;
    height: auto;
    background: #FFF;
    display: flex;
    margin-top: 15px;
    flex-direction: column;
`;

export const CommentItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px 23px;
    border-bottom: 1px solid #E3E3E3;
`;

export const CommentAuthor = styled.p`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px; /* 113.333% */
    margin: 0;
    margin-left: 16px;
    margin-bottom: 6px;
`;

export const CommentText = styled.p`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    margin-left: 15px;
`;

export const CommentWrapper = styled.div`
    position: fixed;
    transform: translate(-50%, -50%); /* 중앙 정렬 */
    left: 50%;
    bottom: 0;
    width: 353px;
    display: flex;
    align-items: center;
`;

export const CommentTextarea = styled.textarea`
    width: 353px;
    height: 31px;
    border-radius: 50px;
    border: 2px solid #D9D9D9;
    background: #FFF;
    resize: none;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 13px 44px 0 27px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #D9D9D9;
        font-family: "Pretendard Variable";
        font-size: 15px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const CommentSendButton = styled.button`
    width: 24px;
    height: 24px;
    border: none;
    cursor: pointer;
    background-image: url("/images/CommentSend.svg");
    background-color: transparent;
    position: absolute;
    right: 20px;
`;