require("dotenv").config();
module.exports = {
  jwtSecret:
    process.env.JWT_SECRET ||
    "tell me what you want what you really really want"
};
