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
    
`;

export const CommentItem = styled.div`

`;

export const CommentAuthor = styled.p`
    
`;

export const CommentText = styled.p`

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