const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/auth-middleware");

const {
  updateUserProfilePicture,
  getUserByID,
  fuzzySearch,
  getSubjectData
} = require("../controllers/users-controller");

router
  .route("/:id/profile-picture")
  .put(validateToken, updateUserProfilePicture);

router.route("/profile-data").post(validateToken, getSubjectData);

router.route("/:id").get(validateToken, getUserByID);

router.route("/").post(validateToken, fuzzySearch);

module.exports = router;
