const plants = require('./plantsModel')

module.exports = {
  validatePlant,
  validateId
}

function validatePlant(req, res, next){
  const plantInfo = req.body;
  if (plantInfo.nickname && plantInfo.species && plantInfo.h2ofrequency) {
    next();
  } else {
    res.status(400).json({ err: "must include nickname, species, and h2ofrequency" });
  }
};

async function validateId(req, res, next){   
  const {id} = req.params
  try {
    const valid = await plants.findPlantById(id)
    if (valid){
      next()
    } else {
      res.status(400).json({ message: "invalid plant id"})
    }
  } catch (error){
    console.log(error)
    res.status(500).json({ message: "problem validating plant id"})
  }
}
