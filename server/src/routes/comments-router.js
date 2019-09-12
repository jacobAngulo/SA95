const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/auth-middleware");

const {
  addComment,
  getComments,
  updateComment,
  deleteComment
} = require("../controllers/comments-controller");

router
  .route("/:id")
  .get(validateToken, getComments)
  .post(validateToken, addComment)
  .put(validateToken, updateComment)
  .delete(validateToken, deleteComment);

module.exports = router;
