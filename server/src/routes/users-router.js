const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/auth-middleware");

const {
  updateProfileImage,
  updateBannerImage,
  getUserByID,
  fuzzySearch,
  getSubjectData
} = require("../controllers/users-controller");

router.route("/:id/profile-image").put(validateToken, updateProfileImage);

router.route("/:id/banner-image").put(validateToken, updateBannerImage);

router.route("/profile-data").post(validateToken, getSubjectData);

router.route("/:id").get(validateToken, getUserByID);

router.route("/").post(validateToken, fuzzySearch);

module.exports = router;
