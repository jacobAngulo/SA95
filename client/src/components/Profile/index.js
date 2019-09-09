import React, { useEffect, useState, Fragment } from "react";
import {
  ProfileContainer,
  ProfileHeaderContainer,
  ProfileImage,
  ProfileBanner,
  ProfileBannerContainer,
  ProfileImageContainer,
  ErrorDisplay,
  FollowsDisplay,
  FollowsSection
} from "../../styles";
import { WindowContent, Cutout, Fieldset, Button, WindowHeader } from "react95";
import { Loading } from "../../utils";

const Profile = ({ match }) => {
  const profileID = match.params.id;
  const userID = localStorage.getItem("userID");
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
  // const [updatingFollowingStatus, setUpdatingFollowingStatus] = useState(false);
  // const [
  //   updatingFollowingStatusError,
  //   setUpdatingFollowingStatusError
  // ] = useState("");

  useEffect(() => {
    setFetchingUserData(true);
    setFetchingUserDataError(false);
    fetch(`${process.env.REACT_APP_ENDPOINT}/api/users/profile-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        userID: userID,
        subjectID: profileID
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setUserData(res);
        setFetchingUserData(false);
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
        setFetchingUserData(false);
        setFetchingUserDataError(error.toString());
      });
  }, [profileID]);

  return (
    <ProfileContainer>
      <ProfileHeaderContainer>
        {fetchingUserData ? (
          <Loading />
        ) : fetchingUserDataError ? (
          <ErrorDisplay>{fetchingUserDataError}</ErrorDisplay>
        ) : (
          <Fragment>
            <ProfileBannerContainer>
              <WindowHeader>
                {userData.full_name
                  ? userData.full_name
                  : `user ${userData.id}`}
              </WindowHeader>
              <Cutout>
                <ProfileBanner
                  src={userData.profile_banner_image_url}
                  alt={`${userData.full_name}'s banner`}
                />
              </Cutout>
            </ProfileBannerContainer>
            <ProfileImageContainer>
              <Cutout>
                <ProfileImage
                  src={userData.profile_image_url}
                  alt={`${userData.full_name}'s profile image`}
                />
              </Cutout>
              <WindowContent>
                <FollowsSection>
                  <FollowsDisplay to={`/${userData.id}/followers`}>
                    <p>followers: </p>
                    <p>{userData.followers.length}</p>
                  </FollowsDisplay>
                  <FollowsDisplay to={`/${userData.id}/following`}>
                    <p>following: </p>
                    <p>{userData.following.length}</p>
                  </FollowsDisplay>
                </FollowsSection>
                <Fieldset label="bio">{userData.bio}</Fieldset>
              </WindowContent>
              <Cutout>
                {userID === profileID ? (
                  <Button fullWidth>edit profile</Button>
                ) : userData.isFollowing ? (
                  <Button fullWidth>stop following</Button>
                ) : (
                  <Button fullWidth>follow</Button>
                )}
              </Cutout>
            </ProfileImageContainer>
          </Fragment>
        )}
      </ProfileHeaderContainer>
    </ProfileContainer>
  );
};

export default Profile;
