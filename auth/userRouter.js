const router = require("express").Router();

const user = require('./authModel')

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const newInfo = req.body;
  
    try{
        const data = await user.update(newInfo, id);
        res.status(200).json({ updated: data });
    } catch (error){
        console.log(error)
        res.status(500).json({ error: "problem updating user"})
    }
        
  }); 

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const deleted = await user.remove(id)
        res.status(200).json(deleted)
    } catch (error){
        console.log(error)
        res.status(500).json({ error: "problem deleting user" })
    }
    
})

module.exports = router