import React, { useState } from "react";
import * as C from "../community/styledCommunity";
import LikeIcon from "../assets/LikeIcon.svg";
import OnLikeIcon from "../assets/OnLikeIcon.svg";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Post = ({ id, content, location, imageUrl, likeCount, createdAt, userId, isLiked: initialIsLiked, petName }) => {
    const { user } = useAuth();
    const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCountState, setLikeCountState] = useState(likeCount);

    const handleLikeToggle = async () => {
        try {
            if (isLiked) {
                // 좋아요 취소
                await axios.delete("http://3.34.183.9:8080/api/likes", {
                    data: { userId: parsedUser.userId, postId: id },
                });
                setIsLiked(false);
                setLikeCountState(likeCountState - 1);
            } else {
                // 좋아요 추가
                await axios.post("http://3.34.183.9:8080/api/likes", {
                    userId: parsedUser.userId,
                    postId: id,
                });
                setIsLiked(true);
                setLikeCountState(likeCountState + 1);
            }
        } catch (error) {
            console.log("좋아요 요청 실패:", error);
        }
    };

    return (
        <>
            <C.PostItem style={{ paddingBottom: "14px" }}>
                <div style={{ display: "flex", paddingTop: "18px", marginLeft: "21px", alignItems: "center" }}>
                    <C.CommuProfileImg src="/images/CommuProfileImg.svg" />
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
                        <C.UserNickname>{petName}</C.UserNickname>
                        <C.PostLocation>{location}</C.PostLocation>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "22px" }}>
                        <C.PostDate>{`${new Date(createdAt).getFullYear()}-${new Date(createdAt).getMonth() + 1}-${new Date(createdAt).getDate()}`}</C.PostDate>
                    </div>
                </div>
                <C.PostImageBox>
                    {imageUrl && <C.PostImage src={imageUrl} />}
                </C.PostImageBox>
                <C.PostContent>{content}</C.PostContent>
                <C.PostInfo>
                    <C.LikeButton onClick={handleLikeToggle}>
                        <img src={isLiked ? OnLikeIcon : LikeIcon } alt="Like" />
                    </C.LikeButton>
                    <span style={{ color: "#000", fontFamily: "Pretendard Variable", fontSize: "12px", fontStyle: "normal", fontWeight: "500", lineHeight: "17px" }}>좋아요&nbsp;</span>
                    <span style={{ color: "#000", fontFamily: "Pretendard Variable", fontSize: "12px", fontStyle: "normal", fontWeight: "700", lineHeight: "17px" }}>{likeCountState}</span>
                    <C.CommentIcon />
                    <span style={{ color: "#000", fontFamily: "Pretendard Variable", fontSize: "12px", fontStyle: "normal", fontWeight: "500", lineHeight: "17px" }}>댓글&nbsp;</span>
                </C.PostInfo> 
            </C.PostItem>
        </>
    );
};

export default Post;