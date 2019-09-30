import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { WindowContent, Fieldset, WindowHeader } from "react95";
import {
  UserAvatar,
  PostInfo,
  CommentContainer
} from "../../../../../../../../../styles";

const Comment = ({
  name,
  content,
  createdAt,
  profileImageUrl,
  commentID,
  userID
}) => (
  <CommentContainer>
    <WindowHeader>
      <PostInfo>
        <UserAvatar src={profileImageUrl} alt={`${name}'s profile picture`} />
        <Link to={`/authenticated/profile/${userID}`}>{name}</Link>
      </PostInfo>
    </WindowHeader>
    <WindowContent>
      <Fieldset label={moment(createdAt).fromNow()}>
        <p>{content}</p>
      </Fieldset>
    </WindowContent>
  </CommentContainer>
);

export default Comment;
