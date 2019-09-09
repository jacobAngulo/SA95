const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../services/secrets").jwtSecret;

module.exports = {
  checkLogin,
  checkRegistration,
  hashPassword,
  validateToken
};

function checkRegistration(req, res, next) {
  const user = req.body;
  if (user.email && user.password) {
    next();
  } else {
    res.status(403).json({ message: "required fields were not provided" });
  }
}

function checkLogin(req, res, next) {
  const user = req.body;
  if (user.email && user.password) {
    next();
  } else {
    res.status(403).json({ message: "required fields were not provided" });
  }
}

function hashPassword(req, res, next) {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 5);
  next();
}

function validateToken(req, res, next) {
  if (req.body.token) {
    const token = req.body.token;
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "bad request: no token provided" });
  }
}
