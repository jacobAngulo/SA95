const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  updateComment,
  deleteComment
} = require("../controllers/comments-controller");

router
  .route("/:id")
  .get(getComments)
  .post(addComment)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
