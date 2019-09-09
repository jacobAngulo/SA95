import React, { useState } from "react";
import { Toolbar, Cutout } from "react95";
import {
  StyledCommentForm,
  CommentFormButton,
  CommentFormTextField
} from "../../../../../../../../../styles";

const CommentForm = ({
  postID,
  comments,
  setComments,
  setShowComments,
  setRenderedComments
}) => {
  const [commentFormInput, setCommentFormInput] = useState("");

  const userID = localStorage.getItem("userID");

  const handleSubmit = e => {
    e.preventDefault();
    if (commentFormInput) {
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/comments/${userID}`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: postID,
          created_at: Date.now(),
          content: commentFormInput
        })
      })
        .then(res => res.json())
        .then(res => {
          setComments([...comments, res]);
          setRenderedComments(comments.length + 1);
          setShowComments(true);
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
      setCommentFormInput("");
    } else {
      alert("you gotta write something!");
    }
  };

  return (
    <Cutout style={{ width: "100%" }}>
      <Toolbar>
        <StyledCommentForm onSubmit={handleSubmit}>
          <CommentFormTextField
            type="text"
            value={commentFormInput}
            onChange={event => setCommentFormInput(event.target.value)}
          />
          <CommentFormButton type="submit">post comment</CommentFormButton>
        </StyledCommentForm>
      </Toolbar>
    </Cutout>
  );
};

export default CommentForm;
