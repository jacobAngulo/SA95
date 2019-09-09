import React, { useState } from "react";
import { HomeContainer, FeedContainer } from "../../styles";
import PostForm from "./components/PostForm";
import Feed from "./components/Feed";

const Home = () => {
  const [posts, setPosts] = useState([]);

  return (
    <HomeContainer>
      <PostForm posts={posts} setPosts={setPosts} />
      <FeedContainer>
        <Feed posts={posts} setPosts={setPosts} />
      </FeedContainer>
    </HomeContainer>
  );
};

export default Home;
