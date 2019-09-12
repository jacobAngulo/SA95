import React, { useState, useEffect, Fragment } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { Button, Cutout, Divider } from "react95";
import {
  CommentWindowButton,
  CommentsContainer
} from "../../../../../../../../styles";

const CommentsSection = ({ postID }) => {
  const [fetchingCommentsStatus, setFetchingCommentsStatus] = useState(true);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [renderedComments, setRenderedComments] = useState(0);

  useEffect(() => {
    let subscribed = true;

    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/comments/${postID}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: token
        }
      })
        .then(res => res.json())
        .then(res => {
          if (subscribed) {
            setComments(res);
            setFetchingCommentsStatus(false);
            if (res.length >= 5) {
              setRenderedComments(5);
            } else {
              setRenderedComments(res.length);
            }
            // console.log(res);
          }
        })
        .catch(error => {
          if (subscribed) {
            console.error("ERROR: ", error);
          }
        });
    } else {
      // TODO: handle no token in localStorage
    }

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <div>
      {showComments && (
        <Cutout>
          <CommentsContainer>
            {comments.slice(0, renderedComments).map(comment => (
              <Fragment key={comment.comment_id}>
                <Comment
                  commentID={comment.comment_id}
                  userID={comment.user_id}
                  profileImageUrl={comment.profile_image_url}
                  name={comment.full_name}
                  content={comment.content}
                  createdAt={comment.created_at}
                />
                {comment !== comments[renderedComments - 1] && <Divider />}
              </Fragment>
            ))}
            <div>
              <CommentWindowButton
                disabled={renderedComments <= 5}
                onClick={() =>
                  renderedComments - 5 < 5
                    ? setRenderedComments(5)
                    : setRenderedComments(renderedComments - 5)
                }
              >
                show less
              </CommentWindowButton>
              <CommentWindowButton
                disabled={renderedComments === comments.length}
                onClick={() =>
                  renderedComments + 5 > comments.length
                    ? setRenderedComments(comments.length)
                    : setRenderedComments(renderedComments + 5)
                }
              >
                show more
              </CommentWindowButton>
            </div>
          </CommentsContainer>
        </Cutout>
      )}
      <Button
        fullWidth
        disabled={!comments.length}
        onClick={() => comments.length && setShowComments(!showComments)}
      >
        {fetchingCommentsStatus
          ? "loading comments..."
          : comments.length
          ? showComments
            ? "hide comments"
            : "show comments"
          : "no comments"}
      </Button>
      <CommentForm
        postID={postID}
        comments={comments}
        setComments={setComments}
        setShowComments={setShowComments}
        setRenderedComments={setRenderedComments}
      />
    </div>
  );
};

export default CommentsSection;
