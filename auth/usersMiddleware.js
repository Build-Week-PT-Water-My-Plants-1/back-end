const users = require('./authModel')

module.exports = {
  validateUser,
  validateId,
  isUnique
}

function validateUser(req, res, next) {
  const userInfo = req.body;
  if (userInfo.username && userInfo.password && userInfo.phonenumber) {
    next();
  } else {
    res.status(400).json({ err: "must include username, password, and phonenumber" });
  }
};

async function validateId(req, res, next){
  const {id} = req.params
  try {
    const valid = await users.findById(id)
    if (valid){
      next()
    } else {
      res.status(400).json({ message: "invalid user id"})
    }
  } catch (error){
    console.log(error)
    res.status(500).json({ message: "problem validating user id"})
  }
}


async function isUnique(req, res, next){
  const userInfo = req.body
  const usernameTaken = await users.findByUsername(userInfo.username)
  const phonenumberTaken = await users.findByPhonenumber(userInfo.phonenumber)

  if (usernameTaken){
    res.status(400).json({ message: "username is taken"})
  } else if (phonenumberTaken){
    res.status(400).json({ message: "phonenumber is already registered"})
  } else {
    next()
  }
}