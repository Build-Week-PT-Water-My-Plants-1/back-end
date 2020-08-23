const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/authRouter");
const plantsRouter = require("../plants/plantsRouter");
const userRouter = require("../auth/userRouter")
const authenticate = require("../auth/authenticateMiddleware");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/plants", authenticate, plantsRouter);
server.use("/api/user", authenticate, userRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
