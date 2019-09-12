const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/auth-middleware");

const {
  addLike,
  getLikes,
  deleteLike
} = require("../controllers/likes-controller");

router
  .route("/:id")
  .post(validateToken, addLike)
  .get(validateToken, getLikes)
  .delete(validateToken, deleteLike);

module.exports = router;
