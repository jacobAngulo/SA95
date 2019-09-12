import React, { useState, useEffect } from "react";
import { Button } from "react95";

const LikesBar = ({ postID }) => {
  const [fetchingLikesStatus, setFetchingLikesStatus] = useState(true);
  const [togglingLikeStatus, setTogglingLikeStatus] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likedStatus, setLikedStatus] = useState(false);

  useEffect(() => {
    let subscribed = true;

    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/likes/${postID}`, {
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
            setLikes(res);
            setFetchingLikesStatus(false);
            const likeIndex = res.findIndex(
              like => like.user_id === parseInt(localStorage.getItem("userID"))
            );
            if (res[likeIndex]) {
              setLikedStatus(true);
            }
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

  const handleToggleLike = () => {
    setTogglingLikeStatus(true);

    const token = localStorage.getItem("token");

    if (token) {
      if (likedStatus) {
        const likeID =
          likes[
            likes.findIndex(
              like => like.user_id === parseInt(localStorage.getItem("userID"))
            )
          ].like_id;
        fetch(`${process.env.REACT_APP_ENDPOINT}/api/likes/${likeID}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            token: token
          }
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setLikedStatus(!likedStatus);
            setTogglingLikeStatus(false);
            setLikes(likes.filter(like => like.like_id !== likeID));
          })
          .catch(error => {
            console.error("ERROR: ", error);
            setTogglingLikeStatus(false);
            alert(`there was an error un-liking this post\nERROR: ${error}`);
          });
      } else {
        fetch(`${process.env.REACT_APP_ENDPOINT}/api/likes/${postID}`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            token: token
          },
          body: JSON.stringify({
            user_id: parseInt(localStorage.getItem("userID"))
          })
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setLikedStatus(!likedStatus);
            setTogglingLikeStatus(false);
            const likeIndex = res.findIndex(
              like => like.user_id === parseInt(localStorage.getItem("userID"))
            );
            console.log(res[likeIndex]);
            setLikes([...likes, res[likeIndex]]);
          })
          .catch(error => {
            console.error("ERROR: ", error);
            setTogglingLikeStatus(false);
            alert(`there was an error liking this post\nERROR: ${error}`);
          });
      }
    } else {
      // TODO: handle no token
    }
  };

  return (
    <Button variant="menu" onClick={handleToggleLike}>
      {togglingLikeStatus
        ? !likedStatus
          ? "❤️ "
          : "🖤 "
        : likedStatus
        ? "❤️ "
        : "🖤 "}
      {fetchingLikesStatus ? "loading" : likes.length} likes
    </Button>
  );
};
export default LikesBar;
