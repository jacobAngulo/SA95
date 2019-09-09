const express = require("express");
const router = express.Router();

const {
  addLike,
  getLikes,
  deleteLike
} = require("../controllers/likes-controller");

router
  .route("/:id")
  .post(addLike)
  .get(getLikes)
  .delete(deleteLike);

module.exports = router;
