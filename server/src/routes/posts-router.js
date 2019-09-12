const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/auth-middleware");

const {
  addPost,
  getPosts,
  updatePost,
  deletePost
} = require("../controllers/posts-controller");

router
  .route("/:id")
  .get(validateToken, getPosts)
  .post(validateToken, addPost)
  .put(validateToken, updatePost)
  .delete(validateToken, deletePost);

module.exports = router;
