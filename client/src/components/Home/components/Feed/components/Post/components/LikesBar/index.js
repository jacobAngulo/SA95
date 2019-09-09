import React, { useState, useEffect } from "react";
import { Button } from "react95";
import axios from "axios";

const LikesBar = ({ postID }) => {
  const [fetchingLikesStatus, setFetchingLikesStatus] = useState(true);
  const [togglingLikeStatus, setTogglingLikeStatus] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likedStatus, setLikedStatus] = useState(false);

  useEffect(() => {
    let subscribed = true;

    axios
      .get(`${process.env.REACT_APP_ENDPOINT}/api/likes/${postID}`)
      .then(res => {
        if (subscribed) {
          setLikes(res.data);
          setFetchingLikesStatus(false);
          const likeIndex = res.data.findIndex(
            like => like.user_id === parseInt(localStorage.getItem("userID"))
          );
          if (res.data[likeIndex]) {
            setLikedStatus(true);
          }
        }
      })
      .catch(error => {
        if (subscribed) {
          console.log("error: ", error);
        }
      });

    return () => {
      subscribed = false;
    };
  }, []);

  const handleToggleLike = () => {
    setTogglingLikeStatus(true);
    if (likedStatus) {
      const likeID =
        likes[
          likes.findIndex(
            like => like.user_id === parseInt(localStorage.getItem("userID"))
          )
        ].like_id;
      axios
        .delete(`${process.env.REACT_APP_ENDPOINT}/api/likes/${likeID}`)
        .then(res => {
          console.log(res);
          setLikedStatus(!likedStatus);
          setTogglingLikeStatus(false);
          setLikes(likes.filter(like => like.like_id !== likeID));
        })
        .catch(error => {
          console.log("ERROR: ", error);
          setTogglingLikeStatus(false);
          alert(`there was an error un-liking this post\nERROR: ${error}`);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/api/likes/${postID}`, {
          user_id: parseInt(localStorage.getItem("userID"))
        })
        .then(res => {
          console.log(res);
          setLikedStatus(!likedStatus);
          setTogglingLikeStatus(false);
          const likeIndex = res.data.findIndex(
            like => like.user_id === parseInt(localStorage.getItem("userID"))
          );
          console.log(res.data[likeIndex]);
          setLikes([...likes, res.data[likeIndex]]);
        })
        .catch(error => {
          console.log("ERROR: ", error);
          setTogglingLikeStatus(false);
          alert(`there was an error liking this post\nERROR: ${error}`);
        });
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
