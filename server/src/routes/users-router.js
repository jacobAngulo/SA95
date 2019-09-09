const express = require("express");
const router = express.Router();

const {
  updateUserProfilePicture,
  getUserByID,
  fuzzySearch,
  getSubjectData
} = require("../controllers/users-controller");

router.route("/:id/profile-picture").put(updateUserProfilePicture);

router.route("/profile-data").post(getSubjectData);

router.route("/:id").get(getUserByID);

router.route("/").post(fuzzySearch);

module.exports = router;
