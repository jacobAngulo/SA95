import styled from "styled-components";
import {
  WindowHeader,
  WindowContent,
  TextField,
  Window,
  Button,
  Cutout,
  Divider
} from "react95";

export const PostHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
`;

export const PostInfo = styled.div`
  display: flex;
  text-shadow: none;
`;

export const PostOptionsHeader = styled(PostInfo)`
  justify-content: space-between;
`;

export const PostFormWindowContainer = styled.div`
  width: 500px;
  margin: 0 auto;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const PostFormWindow = styled(Window)`
  width: 100%;
  margin-top: 75px;
`;

export const CommentWindowButton = styled(Button)`
  width: 50%;
`;

export const CommentsContainer = styled(Window)`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

export const PostOptionsWrapper = styled.div`
  z-index: 10;
  top: 15px;
  right: 20px;
  position: absolute;
  display: block;
  height: max-content;
  width: max-content;
  font-weight: 100;
`;

export const PostOptionsButton = styled(Button)`
  font-size: 12.5px;
  margin-top: 3.5px;
`;

export const CommentContainer = styled(Cutout)`
  width: 100%;
`;

export const EditPostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const PostContainer = styled(Window)`
  width: 100%;
`;

export const StyledCommentForm = styled.form`
  width: 100%;
  display: flex;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const CommentFormTextField = styled(TextField)`
  width: 60% !important;
  @media (max-width: 500px) {
    width: 100% !important;
  }
`;

export const CommentFormButton = styled(Button)`
  width: 40%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const PostOptionsWindowContent = styled(WindowContent)`
  width: 300px;

  @media (max-width: 500px) {
    width: 250px;
  }
`;

export const PostDivider = styled(Divider)`
  margin: 10px 0;
`;
