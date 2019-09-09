import styled from "styled-components";
import { Window, AppBar } from "react95";

export const StyledAppBarInputContainer = styled.div`
  width: 200px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  top: 4px;
`;

export const SearchResultsWindow = styled(Window)`
  width: 300px;
  margin-left: -50px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const StyledAppBar = styled(AppBar)`
  z-index: 19;
`;
