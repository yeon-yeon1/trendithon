import React, { useEffect, useState } from "react";
import * as C from "../community/styledCommunity";
import * as J from "../user/styledJoin";
import * as P from "../community/styledPostDetail";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

const PostDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});

    const getPost = async () => {
        try {
            const response = await axios.get(`http://3.34.183.9:8080/api/posts/${id}`);
            setPost(response.data);
            setLoading(false);
            console.log(loading, post);
        } catch (error) {
            console.log("커뮤니티 상세 조회 실패", error);
        }
    }

    useEffect(() => {
        getPost();
    })

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
                        />
                    )}
                </div>

                <Link to="/write">
                    <C.WriteIcon src="/images/WriteIcon.svg" />
                </Link>
            </C.Container>
        </>
    );
};

export default PostDetail;