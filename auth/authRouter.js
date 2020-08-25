const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../data/dbConfig");
const users = require("./authModel")
const secrets = require("../config/secrets");

const usersMiddleware = require('./middleware')

router.post("/register", usersMiddleware.validateUser, async (req, res) => {
  const userInfo = req.body;
  try {
    
      const hash = bcrypt.hashSync(userInfo.password, 10);
      userInfo.password = hash;

      const data = await users.register(userInfo);
      res.status(201).json(data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "problem registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users.findByUsername(username);
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
