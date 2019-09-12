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
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: error.toString() });
      } else if (decodedToken.exp > Math.round(Date.now() / 1000)) {
        req.decodedJwt = decodedToken;
        // Users.findByEmail(req.decodedJwt.email).then(user => {
        //   if (user) {
        //     const token = Auth.generateToken(user);
        //     res.status(200).json({
        //       token,
        //       userID: user.id
        //     });
        //   } else {
        //     res.status(401).json({ message: "invalid token" });
        //   }
        // });
        next();
      } else {
        res.status(401).json({
          message:
            "jsonwebtoken has expired, please login again to receive a new one"
        });
      }
    });
  } else {
    res.status(403).json({ message: "bad request: no token provided" });
  }
}
