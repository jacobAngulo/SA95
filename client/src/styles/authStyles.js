import styled from "styled-components";
import { Window, TabBody } from "react95";

export const AuthInputAreaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

export const AuthInputAreaLabel = styled.label`
  width: 100px;
`;

export const AuthContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-color: #008080;

  /* background-image: url();
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
`;

export const AuthWindow = styled(Window)`
  display: block;
  width: 400px;
  margin: 100px auto 0px;
`;

export const AuthTabBody = styled(TabBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
