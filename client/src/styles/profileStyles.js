import styled from "styled-components";
import { Window, Cutout } from "react95";
import { Link } from "react-router-dom";

export const ProfileContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #008080;
`;

export const ProfileHeaderContainer = styled.div`
  width: max-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    width: 100vw;
  }
`;

export const ProfileHeader = styled(Window)``;

export const ProfileBannerContainer = styled(Window)`
  margin-top: 100px;
  width: max-content;
  @media (max-width: 900px) {
    margin-top: 47px;
    width: 100vw;
  }
`;

export const ProfileImageContainer = styled(Window)`
  margin-top: -300px;
  width: max-content;
  z-index: 3;
`;

export const ProfileImage = styled.img`
  height: 200px;
  width: 200px;
  display: block;
  object-fit: cover;
`;

export const ProfileBanner = styled.img`
  width: 900px;
  height: 300px;
  display: block;
  object-fit: cover;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const FollowsSection = styled.section`
  margin: -20px 0 10px;
  padding: 10px;
`;

export const FollowsDisplay = styled(Link)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
