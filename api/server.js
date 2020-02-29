const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("../auth/auth-router.js");
const songsRouter = require("../songs/songs-router.js");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// routers
server.use("/api/auth", authRouter);
server.use("/api/songs", songsRouter);

module.exports = server;
