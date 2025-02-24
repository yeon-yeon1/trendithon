import React from "react";

const Post = ({ id, content, location, imageUrl, likeCount, createdAt, userId }) => {
    return (
        <>
            <p>{id}</p>
            <p>{content}</p>
            <p>{location}</p>
            <p>{imageUrl}</p>
            <p>{likeCount}</p>
            <p>{createdAt}</p>
            <p>{userId}</p>
        </>
    );
};

export default Post;