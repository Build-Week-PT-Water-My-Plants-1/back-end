const express = require("express");
const helmet = require("helmet");

const authRouter = require("../auth/authRouter");
const plantRouter = require("../plants/plantsRouter");
const authenticate = require("../auth/authenticateMiddleware");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/auth", authRouter);
// server.use("/api/plants",authenticate, plantRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
