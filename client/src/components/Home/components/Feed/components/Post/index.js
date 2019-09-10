import React from "react";
import PostContent from "./components/PostContent";
// import { Window } from "react95";
// import styled from "styled-components";
import { PostContainer } from "../../../../../../styles";

const Post = ({
  name,
  content,
  postID,
  createdAt,
  userID,
  profileImageUrl,
  posts,
  setPosts
}) => {
  return (
    <PostContainer>
      <PostContent
        profileImageUrl={profileImageUrl}
        userID={userID}
        postID={postID}
        name={name}
        content={content}
        createdAt={createdAt}
        setPosts={setPosts}
        posts={posts}
      />
    </PostContainer>
  );
};

export default Post;
