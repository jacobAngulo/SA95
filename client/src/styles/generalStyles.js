import styled from "styled-components";
import { Button, Avatar, Window } from "react95";

export const BoldButton95 = styled(Button)`
  font-weight: bold;
`;

export const ErrorDisplay = styled.div`
  min-height: 30px;
  max-height: 50px;
  line-height: 30px;
  overflow: auto;
  color: red;
  text-shadow: none;
`;

export const LoadingContainer = styled.div`
  width: max-content;
  margin: 30px auto;
`;
export const UserAvatar = styled(Avatar)`
  margin-right: 10px;
  img {
    object-fit: cover;
  }
`;

export const WindowModal = styled(Window)`
  top: 5px;
  right: 5px;
  position: absolute;
  z-index: 5;
  text-shadow: none;

  @media (max-width: 500px) {
    max-width: 300px;
    word-break: break-all;
  }
`;

// export const Spacer = styled.div`
//   height: 5px;
// `;
