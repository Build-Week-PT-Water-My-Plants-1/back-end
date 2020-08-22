const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../data/dbConfig");
const secrets = require("../config/secrets");

router.post("/register", async (req, res) => {
  const userInfo = req.body;

  try {
    if (userInfo.username && userInfo.password && userInfo.phonenumber) {
      const hash = bcrypt.hashSync(userInfo.password, 10);
      userInfo.password = hash;
      const user = await db("users").insert(userInfo).returning("id");
      const data = await db("users")
        .where({ id: user })
        .select("id", "username", "phonenumber")
        .first();
      res.status(201).json(data);
    } else {
      res.status(400).json({ err: "must include username, password, and phone number" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "problem registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db("users").where({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `${username} logged in`, jwt: token, user: user });
    } else {
      res.status(400).json({ err: "invalid username and password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "problem logging in" });
  }
});

function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
