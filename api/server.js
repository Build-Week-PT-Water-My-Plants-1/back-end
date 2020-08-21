const express = require("express");
const helmet = require("helmet");

const authRouter = require("../auth/authRouter");
const plantsRouter = require("../plants/plantsRouter");
const authenticate = require("../auth/authenticateMiddleware");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/plants", plantsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
