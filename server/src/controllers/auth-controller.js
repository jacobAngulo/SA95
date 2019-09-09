const bcrypt = require("bcryptjs");
const Auth = require("../data/helpers/auth-helper");
const Users = require("../data/helpers/users-helper");

module.exports = {
  loginUser,
  registerUser,
  authenticateUser
};

function loginUser(req, res) {
  const { email, password } = req.body;
  Users.findByEmail(email)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = Auth.generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.full_name}!`,
          token,
          userID: user.id
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function registerUser(req, res) {
  const user = {
    ...req.body,
    full_name: "",
    profile_banner_image_url:
      "https://social-app-profile-pictures.s3.amazonaws.com/1567544109007",
    profile_image_url:
      "https://social-app-profile-pictures.s3.amazonaws.com/1567544003826",
    bio: ""
  };
  Users.addUser(user)
    .then(newUser => {
      const token = Auth.generateToken(newUser);
      res.status(201).json({
        message: `Welcome user ${newUser.id}!`,
        token,
        userID: newUser.id
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function authenticateUser(req, res) {
  if (req.decodedJwt.exp > Math.round(Date.now() / 1000)) {
    Users.findByEmail(req.decodedJwt.email).then(user => {
      if (user) {
        const token = Auth.generateToken(user);
        res.status(200).json({
          token,
          userID: user.id
        });
      } else {
        res.status(403).json({ message: "invalid token" });
      }
    });
  } else {
    res.status(403).json({
      message:
        "jsonwebtoken has expired, please login again to receive a new one"
    });
  }
}
