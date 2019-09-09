import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Post from "./components/Post";
import { Window, WindowContent } from "react95";
import { Loading } from "../../../../utils";
import { PostDivider } from "../../../../styles";

const Feed = ({ posts, setPosts }) => {
  const [communicating, setCommunicating] = useState(true);

  useEffect(() => {
    let subscribed = true;

    axios
      .get(
        `${process.env.REACT_APP_ENDPOINT}/api/posts/${localStorage.getItem(
          "userID"
        )}`
      )
      .then(res => {
        if (subscribed) {
          setPosts(res.data);
          setCommunicating(false);
        }
        // console.log(res);
      })
      .catch(error => {
        if (subscribed) {
          setCommunicating(false);
        }
        console.log("ERROR: ", error);
      });

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <Window style={{ width: "100%" }}>
      <WindowContent>
        {communicating ? (
          <Loading label="loading posts " />
        ) : posts.length === 0 ? (
          <div>
            <p>
              no posts
              <span role="img" aria-label="speak no evil monkey">
                🙊
              </span>
            </p>
          </div>
        ) : (
          posts.map(post => (
            <Fragment key={post.post_id}>
              <Post
                userID={post.user_id}
                postID={post.post_id}
                key={post.post_id}
                name={post.full_name}
                profileImageUrl={post.profile_image_url}
                content={post.content}
                createdAt={post.created_at}
                posts={posts}
                setPosts={setPosts}
              />
              {post !== posts[posts.length - 1] && <PostDivider />}
            </Fragment>
          ))
        )}
      </WindowContent>
    </Window>
  );
};

export default Feed;
