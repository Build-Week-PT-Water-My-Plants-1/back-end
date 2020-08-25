const router = require("express").Router()

const plants = require("./plantsModel")

const userMiddleware = require("../auth/usersMiddleware")
const plantsMiddleware = require("./plantsMiddleware")

router.get("/", async (req, res) => {
  const data = await plants.findAllPlants()
  res.status(200).json(data)
})

router.get("/:id", userMiddleware.validateId, async (req, res) => {
  const { id } = req.params
  try {
    const data = await plants.findPlantsByUserId(id)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "unable to get plants" })
  }
})

router.post(
  "/:id",
  userMiddleware.validateId,
  plantsMiddleware.validatePlant,
  async (req, res) => {
    const { id } = req.params
    const plantInfo = req.body
    plantInfo.user_id = id

    try {
      const data = await plants.add(plantInfo)
      res.status(201).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "problem creating plant" })
    }
  }
)

router.put("/:id", plantsMiddleware.validateId, async (req, res) => {
  const { id } = req.params
  const newInfo = req.body

  try {
    const data = await plants.update(newInfo, id)
    res.status(200).json({ updated: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "problem updating plant" })
  }
})

router.delete("/:id", plantsMiddleware.validateId, async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await plants.remove(id)
    res.status(200).json(deleted)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "problem deleting plant" })
  }
})

module.exports = router
