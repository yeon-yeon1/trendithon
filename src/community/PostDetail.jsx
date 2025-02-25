import React, { useEffect, useState } from "react";
import * as C from "../community/styledCommunity";
import * as J from "../user/styledJoin";
import * as P from "../community/styledPostDetail";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import { useAuth } from "../context/AuthContext";

const PostDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const parsedUser = typeof user === "string" ? JSON.parse(user) : user;    
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        getPost();
        getComments();
    }, [id]);

    const getPost = async () => {
        try {
            const response = await axios.get(`http://3.34.183.9:8080/api/posts/${id}`);
            setPost(response.data);
            setLoading(false);
        } catch (error) {
            console.log("커뮤니티 상세 조회 실패", error);
        }
    };

    // 댓글 목록 조회
    const getComments = async () => {
        try {
            const response = await axios.get("http://3.34.183.9:8080/api/comments", {
                params: { postId: parseInt(id, 10) },
            });
            console.log("댓글 조회 성공:", response.data);
            setComments(response.data);
        } catch (error) {
            console.log("댓글 조회 실패", error.response?.data || error);
        }
    };

    // 댓글 입력
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 등록
    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return; // 빈 댓글 방지

        try {
            const response = await axios.post("http://3.34.183.9:8080/api/comments", {
                comment: newComment,
                userId: parsedUser.userId,
                postId: parseInt(id, 10),
            });
            console.log("댓글 등록 성공:", response.data);
            setNewComment(""); // 입력 필드 초기화
            getComments(); // 댓글 목록 갱신
        } catch (error) {
            console.log("댓글 등록 실패", error)
        }
    };

    return (
        <>
            <C.Container>
                <C.JoinHeader>
                    <Link to="/community">
                        <J.BackIcon src="/images/BackIcon.svg" />
                    </Link>
                    <P.PostDetailTitle>커뮤니티 상세</P.PostDetailTitle>
                </C.JoinHeader>

                {/* 커뮤니티 상세 조회 */}
                <div>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        <Post
                            id={post.id}
                            content={post.content}
                            location={post.location}
                            imageUrl={post.imageUrl}
                            likeCount={post.likeCount}
                            createdAt={post.createdAt}
                            userId={post.userId}
                            isLiked={post.isLiked || false} // 기본값 false
                            petName={post.petName}
                        />
                    )}
                </div>

                {/* 댓글 목록 출력 */}
                <P.CommentList>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <P.CommentItem key={index}>
                                <P.CommentAuthor>{comment.petName}</P.CommentAuthor>
                                <P.CommentText>{comment.comment}</P.CommentText>
                            </P.CommentItem>
                        ))
                    ) : (
                        <p style={{ color: "#AAA", fontFamily: "Inter", fontSize: "12px", fontStyle: "normal", fontWeight: "600", lineHeight: "normal" }}>
                            아직 댓글이 없습니다
                        </p>
                    )}
                </P.CommentList>

                {/* 댓글 입력창 */}
                <P.CommentWrapper>
                    <P.CommentTextarea
                        placeholder="댓글을 입력해 주세요"
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <P.CommentSendButton onClick={handleCommentSubmit} />
                </P.CommentWrapper>
                
                <Link to="/write">
                    <C.WriteIcon src="/images/WriteIcon.svg"/>
                </Link>
            </C.Container>
        </>
    );
};

export default PostDetail;