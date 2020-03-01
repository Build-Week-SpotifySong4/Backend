const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

// routes
const authRouter = require("../auth/auth-router.js");
const songsRouter = require("../songs/songs-router.js");
// middleware
const authenticate = require("../middleware/restricted.js");
const validateCreds = require("../middleware/validateCreds.js");

server.use(express.json());
server.use(cors());
server.use(helmet());

// routers
server.use("/api/auth", validateCreds, authRouter);
server.use("/api/songs", authenticate, songsRouter);

module.exports = server;
