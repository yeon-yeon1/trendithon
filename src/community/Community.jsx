import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as C from "../community/styledCommunity";
// import * as H from "../home/styledHome";
import * as J from "../user/styledJoin";
import Footer from "../components/Footer";
// import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Community = () => {
    // const navigate = useNavigate();
    // const { user } = useAuth();
    const [postList, setPostList] = useState([]); // 게시글 목록 상태

    // const menuItems = [
    //     { Icon: H.HomeIcon, path: "/home" },
    //     { Icon: H.CommuIcon, path: "/community" },
    //     { Icon: H.FlagIcon, path: "/plogging" },
    //     { Icon: H.MyPageIcon, path: "/mypage" },
    // ];

    // 커뮤니티 게시글 조회 API 요청
    const getPostList = async () => {
        try {
            const response = await axios.get("http://3.34.183.9:8080/api/posts/all");
            setPostList(response.data); // 데이터 저장
            console.log(postList);
        } catch (error) {
            console.log("커뮤니티 게시글 조회 실패", error);
        }
    };

    // 페이지 로드 시 한 번만 실행
    useEffect(() => {
        getPostList();
    }, []);

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
                        (postList.map((post) => (
                            <C.PostItem key={post.id}>
                                <Link to={`/community/${post.id}`} style={{ textDecoration: "none" }}>
                                    <C.PostImageBox>
                                        {post.imageUrl && <C.PostImage src={post.imageUrl} />}
                                    </C.PostImageBox>
                                    <C.PostContent>{post.content}</C.PostContent>
                                    <C.PostInfo>
                                        <span>좋아요 {post.likeCount}</span>
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </C.PostInfo>        
                                </Link>
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

            {/* <H.Footer>
                {menuItems.map((item, index) => (
                <H.NavItem key={index} onClick={() => navigate(item.path)}>
                    <item.Icon />
                </H.NavItem>
                ))}
            </H.Footer> */}
            <Footer />
        </>
    );
}

export default Community;