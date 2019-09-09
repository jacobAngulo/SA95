const express = require("express");
const router = express.Router();

const {
  addPost,
  getPosts,
  updatePost,
  deletePost
} = require("../controllers/posts-controller");

router
  .route("/:id")
  .get(getPosts)
  .post(addPost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
