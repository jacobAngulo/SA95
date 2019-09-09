const express = require("express");
const router = express.Router();

const {
  addFollow,
  deleteFollow
} = require("../controllers/follows-controller");

router.route("/").post(addFollow);

router.route("/:id").delete(deleteFollow);

module.exports = router;
