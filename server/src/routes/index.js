const express = require("express");

const authRouter = require("./auth-router");
const postsRouter = require("./posts-router");
const likesRouter = require("./likes-router");
const commentsRouter = require("./comments-router");
const usersRouter = require("./users-router");
const followsRouter = require("./follows-router");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/likes", likesRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);
router.use("/follows", followsRouter);

module.exports = router;
