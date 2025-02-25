import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "../community/styledCommunity";
import * as J from "../user/styledJoin";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import LikeIcon from "../assets/LikeIcon.svg";
import OnLikeIcon from "../assets/OnLikeIcon.svg";

const Community = () => {
    const { user } = useAuth();
    const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
    const [postList, setPostList] = useState([]); // 게시글 목록 상태
    const [location, setLocation] = useState("");
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(null);
    console.log("🔍 현재 로그인한 사용자:", user); // ☑️ 진경 추가 부분

    // 페이지 로드 시 한 번만 실행
    useEffect(() => {
        const savedLocation = localStorage.getItem("location");
        if (savedLocation) {
            setLocation(JSON.parse(savedLocation));
        }

        getPostList();
    }, []);

    // 커뮤니티 게시글 조회 API 요청
    const getPostList = async () => {
        try {
            const response = await axios.get("http://3.34.183.9:8080/api/posts/all");
            const updatedPosts = response.data.map(post => ({
                ...post,
                isLiked: false,
            }));
            setPostList(updatedPosts); // 데이터 저장
            // console.log(postList);
        } catch (error) {
            console.log("커뮤니티 게시글 조회 실패", error);
        }
    };

    // 좋아요 기능
    const handleLikeToggle = async (postId, index) => {
        try {
            const updatedPosts = [...postList];
            const post = updatedPosts[index];

            if (post.isLiked) {
                // 좋아요 취소
                await axios.delete("http://3.34.183.9:8080/api/likes", {
                    data: {userId: parsedUser.userId, postId: postId},
                });
                updatedPosts[index] = {
                    ...post,
                    isLiked: false,
                    likeCount: post.likeCount - 1,
                };
            } else {
                // 좋아요 추가
                await axios.post("http://3.34.183.9:8080/api/likes", {
                    userId: parsedUser.userId,
                    postId: postId,
                });
                updatedPosts[index] = {
                    ...post,
                    isLiked: true,
                    likeCount: post.likeCount + 1,
                };
            }

            setPostList(updatedPosts);
        } catch (error) {
            console.log("좋아요 요청 실패:", error);
        }
    };

    // 메뉴 토글(삭제&수정)
    const toggleMenu = (postId) => {
        setMenuVisible(menuVisible === postId ? null : postId);
    };

    // 게시글 삭제
    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://3.34.183.9:8080/api/posts/${postId}`, {
                data: { userId: parsedUser.userId },
            });

            setPostList(postList.filter(post => post.id !== postId));
            setMenuVisible(null);
        } catch (error) {
            console.log("게시글 삭제 실패", error);
        }
    };

    // 게시글 수정
    const handleEditPost = (postId) => {
        navigate(`/edit/${postId}`);
    };

    return (
        <>
            <C.Container>
                <C.JoinHeader>
                    <Link to="/home">
                        <J.BackIcon src="/images/BackIcon.svg" />
                    </Link>
                    <J.JoinTitle>커뮤니티</J.JoinTitle>
                </C.JoinHeader>

                {/* 커뮤니티 게시글 목록 출력 */}
                <C.PostList>
                    {postList.length > 0 ?
                        (postList.map((post, index) => (
                            <C.PostItem key={post.id}>
                                <div style={{ display: "flex", marginTop: "18px", marginLeft: "21px", alignItems: "center",  }}>
                                    <C.CommuProfileImg src="/images/CommuProfileImg.svg" />
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "16px" }}>
                                        <C.UserNickname>{post.petName}</C.UserNickname>
                                        <C.PostLocation>{post.location}</C.PostLocation>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "auto", marginRight: "22px" }}>
                                        <C.PostDate>{`${new Date(post.createdAt).getFullYear()}-${new Date(post.createdAt).getMonth() + 1}-${new Date(post.createdAt).getDate()}`}</C.PostDate>
                                        <C.CircleButton onClick={() => toggleMenu(post.id)} />
                                        {menuVisible === post.id && (
                                            <C.CommuMenu>
                                                <C.CommuDeleteButton onClick={() => handleDeletePost(post.id)}>삭제하기</C.CommuDeleteButton>
                                                <C.CommuEditButton onClick={() => handleEditPost(post.id)}>수정하기</C.CommuEditButton>
                                            </C.CommuMenu>
                                        )}
                           
                                    </div>
                                </div>
                                <Link to={`/community/${post.id}`} style={{ textDecoration: "none" }}>
                                    <C.PostImageBox>
                                        {post.imageUrl && <C.PostImage src={post.imageUrl} />}
                                    </C.PostImageBox>
                                    <C.PostContent style={{ height: "34px", display: "block", overflow: "hidden", textOverflow: "ellipsis" }}>{post.content}</C.PostContent>       
                                </Link>
                                <C.PostInfo>
                                    <C.LikeButton onClick={() => handleLikeToggle(post.id, index)}>
                                        <img src={post.isLiked ? OnLikeIcon : LikeIcon } alt="Like" />
                                    </C.LikeButton>
                                    <span style={{ color: "#000", fontFamily: "Pretendard Variable", fontSize: "12px", fontStyle: "normal", fontWeight: "500", lineHeight: "17px" }}>좋아요&nbsp;</span>
                                    <span style={{ color: "#000", fontFamily: "Pretendard Variable", fontSize: "12px", fontStyle: "normal", fontWeight: "700", lineHeight: "17px" }}>{post.likeCount}</span>
                                    <C.CommentIcon />
                                    <span style={{ color: "#000", fontFamily: "Pretendard Variable", fontSize: "12px", fontStyle: "normal", fontWeight: "500", lineHeight: "17px" }}>댓글&nbsp;</span>
                                </C.PostInfo> 
                            </C.PostItem>
                        ))
                    ) : (
                        <p>게시글이 없습니다.</p>
                    )}
                </C.PostList>

                <Link to="/write">
                    <C.WriteIcon src="/images/WriteIcon.svg" />
                </Link>
            </C.Container>

            <Footer />
        </>
    );
}

export default Community;