import React, { Fragment } from "react";
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

function ProfilePage({
  userData,
  fetchingUserData,
  fetchingUserDataError,
  userID,
  profileID,
  followUser,
  unFollowUser
}) {
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
                <Fieldset label="bio">{userData.bio}</Fieldset>
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
              </WindowContent>
              <Cutout>
                {userID === profileID ? (
                  <Button fullWidth>edit profile</Button>
                ) : userData.isFollowing ? (
                  <Button fullWidth onClick={unFollowUser}>
                    stop following
                  </Button>
                ) : (
                  <Button fullWidth onClick={followUser}>
                    follow
                  </Button>
                )}
              </Cutout>
            </ProfileImageContainer>
          </Fragment>
        )}
      </ProfileHeaderContainer>
    </ProfileContainer>
  );
}

export default ProfilePage;
