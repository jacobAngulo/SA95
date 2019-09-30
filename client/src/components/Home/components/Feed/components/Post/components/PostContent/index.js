import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  WindowContent,
  Fieldset,
  List,
  ListItem,
  WindowHeader,
  TextArea,
  Button
} from "react95";
import LikesBar from "../LikesBar";
import CommentsSection from "../CommentsSection";
import {
  PostHeader,
  PostInfo,
  UserAvatar,
  PostOptionsWrapper,
  PostOptionsButton,
  PostOptionsHeader,
  WindowModal,
  EditPostForm,
  ErrorDisplay,
  CommentWindowButton,
  PostOptionsWindowContent
} from "../../../../../../../../styles";
import { Loading } from "../../../../../../../../utils";
import moment from "moment";

const PostOptionsDropdownMenu = ({
  setOpen,
  userID,
  name,
  editPostModal,
  setEditPostModal,
  deletePostModal,
  setDeletePostModal,
  edits,
  setEdits,
  editing,
  setEditing,
  postID,
  createdAt,
  editingError,
  setEditingError,
  setDisplayedContent,
  displayedContent,
  deleting,
  setDeleting,
  deletingError,
  setDeletingError,
  setPosts,
  posts
}) => {
  const postOptionsWrapperNode = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = event => {
    if (!postOptionsWrapperNode.current.contains(event.target)) {
      setOpen(false);
      setEditPostModal(false);
      setDeletePostModal(false);
    }
  };

  const handleEditPostSubmit = () => {
    const token = localStorage.getItem("token");

    if (token) {
      if (edits.length) {
        setEditing(true);
        fetch(`${process.env.REACT_APP_ENDPOINT}/api/posts/${postID}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            token: token
          },
          body: JSON.stringify({
            id: postID,
            user_id: userID,
            content: edits,
            created_at: createdAt
          })
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setDisplayedContent(res.content);
            setEditing(false);
            setOpen(false);
            setEditPostModal(false);
          })
          .catch(error => {
            console.log(`ERROR: ${error}`);
            setEditingError(error.toString());
            setEditing(false);
          });
      } else {
        setEditingError("your post can not be empty");
      }
    } else {
      // TODO: handle no token in localStorage
    }
  };

  const handleDeletePost = () => {
    setDeleting(true);

    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/posts/${postID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token
        }
      })
        .then(res => res.json())
        .then(() => {
          setOpen(false);
          setPosts(posts.filter(post => post.post_id !== postID && post));
        })
        .catch(error => {
          setDeletingError(error.toString());
          setDeleting(false);
          console.error(`ERROR: ${error}`);
        });
    } else {
      // TODO: handle no token in localStorage
    }
  };

  return (
    <PostOptionsWrapper ref={postOptionsWrapperNode}>
      <List horizontalAlign="right" verticalAlign="bottom">
        <Link to={`/authenticated/profile/${userID}`}>
          <ListItem size="sm" disabled={editPostModal || deletePostModal}>
            <span role="img" aria-label="link symbol">
              🔗
            </span>
            go to
            {userID === parseInt(localStorage.getItem("userID"))
              ? " your"
              : ` ${name.split(" ")[0]}'s`}{" "}
            profile
          </ListItem>
        </Link>
        {userID === parseInt(localStorage.getItem("userID")) && (
          <Fragment>
            <ListItem size="sm" disabled={editPostModal || deletePostModal}>
              <div onClick={() => !deletePostModal && setEditPostModal(true)}>
                <span role="img" aria-label="hammer">
                  🔨
                </span>
                edit post
              </div>
              {editPostModal && (
                <WindowModal>
                  <WindowHeader>
                    <PostOptionsHeader>
                      <p>Edit Post</p>
                      <PostOptionsButton
                        disabled={editing}
                        size="sm"
                        square
                        onClick={() => setEditPostModal(false)}
                      >
                        <span role="img" aria-label="heavy multiplication x">
                          ✖
                        </span>
                      </PostOptionsButton>
                    </PostOptionsHeader>
                  </WindowHeader>
                  <PostOptionsWindowContent>
                    {editing ? (
                      <Loading />
                    ) : (
                      <EditPostForm
                        // disabled={edits === content}
                        onSubmit={event => {
                          event.preventDefault();
                          edits !== displayedContent && handleEditPostSubmit();
                        }}
                      >
                        <TextArea
                          value={edits}
                          onChange={event => setEdits(event.target.value)}
                        />
                        <ErrorDisplay>
                          {editingError && editingError}
                        </ErrorDisplay>
                        <Button
                          type="submit"
                          disabled={edits === displayedContent}
                        >
                          edit post
                        </Button>
                      </EditPostForm>
                    )}
                  </PostOptionsWindowContent>
                </WindowModal>
              )}
            </ListItem>
            <ListItem size="sm" disabled={editPostModal || deletePostModal}>
              <div onClick={() => !editPostModal && setDeletePostModal(true)}>
                <span role="img" aria-label="collision symbol">
                  💥
                </span>
                delete post
              </div>
              {deletePostModal && (
                <WindowModal>
                  <WindowHeader>
                    <PostOptionsHeader>
                      <p>Delete Post</p>
                      <PostOptionsButton
                        size="sm"
                        square
                        onClick={() => setDeletePostModal(false)}
                      >
                        <span role="img" aria-label="heavy multiplication x">
                          ✖
                        </span>
                      </PostOptionsButton>
                    </PostOptionsHeader>
                  </WindowHeader>
                  <PostOptionsWindowContent>
                    {deleting ? (
                      <Loading />
                    ) : (
                      <Fragment>
                        <p
                          style={{
                            textAlign: "center",
                            wordBreak: "break-all"
                          }}
                        >
                          are you sure?
                        </p>
                        <ErrorDisplay>
                          {deletingError && deletingError}
                        </ErrorDisplay>
                        <CommentWindowButton onClick={handleDeletePost}>
                          yes
                        </CommentWindowButton>
                        <CommentWindowButton
                          onClick={() => setDeletePostModal(false)}
                        >
                          no
                        </CommentWindowButton>
                      </Fragment>
                    )}
                  </PostOptionsWindowContent>
                </WindowModal>
              )}
            </ListItem>
          </Fragment>
        )}
      </List>
    </PostOptionsWrapper>
  );
};

const PostContent = ({
  name,
  content,
  createdAt,
  profileImageUrl,
  userID,
  postID,
  posts,
  setPosts
}) => {
  const [open, setOpen] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [edits, setEdits] = useState(content);
  const [displayedContent, setDisplayedContent] = useState(content);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingError, setEditingError] = useState("");
  const [deletingError, setDeletingError] = useState("");

  return (
    <Fragment>
      <PostHeader>
        <PostInfo>
          <UserAvatar src={profileImageUrl} alt={`${name}'s profile picture`} />
          <Link to={`/authenticated/profile/${userID}`}>{name}</Link>
        </PostInfo>
        <div>
          <PostOptionsButton
            square
            size="sm"
            active={open}
            onClick={() => setOpen(true)}
          >
            <span role="img" aria-label="high voltage sign">
              ⚡
            </span>
          </PostOptionsButton>
          {open && (
            <PostOptionsDropdownMenu
              setOpen={setOpen}
              userID={userID}
              name={name}
              openFlag={open}
              editPostModal={editPostModal}
              setEditPostModal={setEditPostModal}
              deletePostModal={deletePostModal}
              setDeletePostModal={setDeletePostModal}
              edits={edits}
              setEdits={setEdits}
              content={content}
              postID={postID}
              editing={editing}
              setEditing={setEditing}
              deleting={deleting}
              setDeleting={setDeleting}
              editingError={editingError}
              setEditingError={setEditingError}
              deletingError={deletingError}
              setDeletingError={setDeletingError}
              createdAt={createdAt}
              setDisplayedContent={setDisplayedContent}
              displayedContent={displayedContent}
              posts={posts}
              setPosts={setPosts}
            />
          )}
        </div>
      </PostHeader>
      <WindowContent>
        <Fieldset label={moment(createdAt).fromNow()}>
          {displayedContent}
        </Fieldset>
        <LikesBar postID={postID} />
        <CommentsSection postID={postID} />
      </WindowContent>
    </Fragment>
  );
};

export default PostContent;
