import React, { useState } from "react";
import {
  PostFormWindowContainer,
  PostFormWindow,
  ErrorDisplay
} from "../../../../styles";
import { Loading } from "../../../../utils";
import { TextArea, WindowHeader, WindowContent, Button } from "react95";

const PostForm = ({ posts, setPosts }) => {
  const [postFormInput, setPostFormInput] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (token) {
      if (postFormInput) {
        setPosting(true);
        fetch(
          `${process.env.REACT_APP_ENDPOINT}/api/posts/${localStorage.getItem(
            "userID"
          )}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              token: token
            },
            body: JSON.stringify({
              created_at: Date.now(),
              content: postFormInput
            })
          }
        )
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setPosting(false);
            setPosts([res, ...posts]);
          })
          .catch(error => {
            console.log("ERROR: ", error);
            setPosting(false);
            setError(error.toString());
          });
        setPostFormInput("");
      } else {
        setError("You have to write something!");
      }
    } else {
      // TODO: handle no token in localStorage
    }
  };

  return (
    <PostFormWindowContainer>
      <PostFormWindow>
        <WindowHeader>{posting ? "posting..." : "create a post"}</WindowHeader>
        <WindowContent>
          {posting ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit}>
              <TextArea
                value={postFormInput}
                onChange={e => setPostFormInput(e.target.value)}
                placeholder="What's on your mind?"
              />
              <ErrorDisplay>{error}</ErrorDisplay>
              <Button fullWidth type="submit">
                post
              </Button>
            </form>
          )}
        </WindowContent>
      </PostFormWindow>
    </PostFormWindowContainer>
  );
};

export default PostForm;
