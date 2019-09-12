import React, { useState, useEffect, Fragment } from "react";
import Post from "./components/Post";
import { withRouter } from "react-router-dom";
import { Window, WindowContent } from "react95";
import { Loading } from "../../../../utils";
import { PostDivider } from "../../../../styles";

const Feed = ({ posts, setPosts, history }) => {
  const [communicating, setCommunicating] = useState(true);

  useEffect(() => {
    let subscribed = true;

    const token = localStorage.getItem("token");

    if (token) {
      fetch(
        `${process.env.REACT_APP_ENDPOINT}/api/posts/${localStorage.getItem(
          "userID"
        )}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            token: token
          }
        }
      )
        .then(res => {
          if (res.status === 401) {
            console.error(`ERROR: ${res}`);
            history.push("/");
          } else {
            return res.json();
          }
        })
        .then(res => {
          if (subscribed) {
            setPosts(res);
            setCommunicating(false);
          }
        })
        .catch(error => {
          if (subscribed) {
            setCommunicating(false);
            setPosts([]);
          }
          console.error(`ERROR: ${error}`);
          history.push("/");
        });
    } else {
      history.push("/");
    }

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

export default withRouter(Feed);
