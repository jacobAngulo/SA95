const express = require("express");
const Router = require("./routes");
const cors = require("cors");
const morgan = require("morgan");
const parser = require("body-parser");

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(parser.json());
server.use("/api", Router);

server.get("/", (req, res) => {
  res.send("welcome to the /");
});

module.exports = server;
