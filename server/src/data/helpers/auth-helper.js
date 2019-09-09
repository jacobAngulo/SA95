require("dotenv").config();
const db = require("../dbConfig");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../services/secrets").jwtSecret;

module.exports = {
  generateToken
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    password: user.password
  };

  const secret = process.env.JWT_SECRET || jwtSecret;

  const options = {
    expiresIn: 60 * 60
  };

  return jwt.sign(payload, secret, options);
}
