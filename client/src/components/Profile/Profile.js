import React, { useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";

const Profile = ({ history }) => {
  let { id: profileID } = useParams();
  profileID = parseInt(profileID);
  const userID = parseInt(localStorage.getItem("userID"));
  const [userData, setUserData] = useState({});
  const [fetchingUserData, setFetchingUserData] = useState(true);
  const [fetchingUserDataError, setFetchingUserDataError] = useState("");
  // const [updatingContent, setUpdatingContent] = useState(false);
  // const [updatingContentError, setUpdatingContentError] = useState("");
  // const [updatingProfileImage, setUpdatingProfileImage] = useState(false);
  // const [updatingProfileImageError, setUpdatingProfileImageError] = useState(
  //   ""
  // );
  // const [updatingBannerImage, setUpdatingBannerImage] = useState(false);
  // const [updatingBannerImageError, setUpdatingBannerImageError] = useState("");
  const [updatingFollowingStatus, setUpdatingFollowingStatus] = useState(false);
  const [
    updatingFollowingStatusError,
    setUpdatingFollowingStatusError
  ] = useState("");

  useEffect(() => {
    setFetchingUserData(true);
    setFetchingUserDataError(false);

    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_ENDPOINT}/api/users/profile-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      mode: "cors",
      body: JSON.stringify({
        userID: userID,
        subjectID: profileID
      })
    })
      .then(res => {
        if (res.status === 401) {
          history.push("/");
        } else {
          return res.json();
        }
      })
      .then(res => {
        console.log(res);
        setUserData(res);
        setFetchingUserData(false);
      })
      .catch(error => {
        console.error(`ERROR: ${error}`);
        setFetchingUserData(false);
        setFetchingUserDataError(error.toString());
      });
  }, [profileID]);

  const followUser = () => {
    setUpdatingFollowingStatus(true);
    setUpdatingFollowingStatusError("");

    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_ENDPOINT}/api/follows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      mode: "cors",
      body: JSON.stringify({
        userID: userID,
        subjectID: profileID
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setUserData({
          ...userData,
          isFollowing: true,
          followers: [...userData.followers, res.newFollow]
        });
        setUpdatingFollowingStatus(false);
      })
      .catch(error => {
        console.error(`ERROR: ${error}`);
        setUpdatingFollowingStatus(false);
        setUpdatingFollowingStatusError(error.toString());
      });
  };

  const unFollowUser = () => {
    setUpdatingFollowingStatus(true);
    setUpdatingFollowingStatusError("");

    const token = localStorage.getItem("token");

    const { id: followID } = userData.followers.find(
      follower => follower.user_id === userID
    );

    console.log(followID);

    fetch(`${process.env.REACT_APP_ENDPOINT}/api/follows/${followID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setUserData({
          ...userData,
          isFollowing: false,
          followers: userData.followers.filter(
            follower => follower.id !== followID
          )
        });
        setUpdatingFollowingStatus(false);
      })
      .catch(error => {
        console.error(`ERROR: ${error}`);
        setUpdatingFollowingStatus(false);
        setUpdatingFollowingStatusError(error.toString());
      });
  };

  return (
    <ProfilePage
      userData={userData}
      fetchingUserData={fetchingUserData}
      fetchingUserDataError={fetchingUserDataError}
      userID={userID}
      profileID={profileID}
      followUser={followUser}
      unFollowUser={unFollowUser}
      updatingFollowingStatus={updatingFollowingStatus}
      updatingFollowingStatusError={updatingFollowingStatusError}
    />
  );
};

export default withRouter(Profile);
