const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../data/dbConfig");
const secrets = require("../config/secret");

router.post("/register", async (req, res) => {
  const userInfo = req.body;

  try {
    const data = await db("users").insert(userInfo);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "problem registering user" });
  }
});

module.exports = router;
