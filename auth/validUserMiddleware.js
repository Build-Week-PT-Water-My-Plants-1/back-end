module.exports = (req, res, next) => {
  const userInfo = req.body;
  if (userInfo.username && userInfo.password && userInfo.phonenumber) {
    next();
  } else {
    res.status(400).json({ err: "must include username, password, and phonenumber" });
  }
};
