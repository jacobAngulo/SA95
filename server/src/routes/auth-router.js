const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  authenticateUser
} = require("../controllers/auth-controller");

const {
  checkLogin,
  checkRegistration,
  hashPassword,
  validateToken
} = require("../middleware/auth-middleware");

router.route("/login").post(checkLogin, loginUser);
router
  .route("/registration")
  .post(checkRegistration, hashPassword, registerUser);
router.route("/authentication").post(validateToken, authenticateUser);

module.exports = router;
