module.exports = (req, res, next) => {
  const plantInfo = req.body;
  if (plantInfo.nickname && plantInfo.species && plantInfo.h2ofrequency) {
    next();
  } else {
    res.status(400).json({ err: "must include nickname, species, and h2ofrequency" });
  }
};
