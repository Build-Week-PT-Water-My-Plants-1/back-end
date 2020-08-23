const router = require("express").Router();

const user = require('./authModel')
const userMiddleware = require('./middleware')

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const valid = await user.findById(id);

      if (valid) {
        const newInfo = req.body;
  
        const data = await user.update(newInfo, id);
        res.status(200).json({ updated: data });
      } else {
        res.status(400).json({ error: "invalid user id" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "problem updating the user" });
    }
  });

router.delete("/:id", userMiddleware.validateId, async (req, res) => {
    const { id } = req.params

    try{
        const deleted = await user.remove(id)
        res.status(200).json(deleted)
    } catch (error){
        res.status(500).json({ error: "problem deleting user" })
    }
    
})

module.exports = router