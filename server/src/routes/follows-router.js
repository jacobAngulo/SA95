const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/auth-middleware");

const {
  addFollow,
  deleteFollow
} = require("../controllers/follows-controller");

router.route("/").post(validateToken, addFollow);

router.route("/:id").delete(validateToken, deleteFollow);

module.exports = router;
