import styled from "styled-components";

export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #008080;
  padding-bottom: 50px;
`;

export const FeedContainer = styled.div`
  width: 500px;
  margin: 50px auto;
  background-color: white;

  @media (max-width: 500px) {
    width: 100%;
  }
`;
