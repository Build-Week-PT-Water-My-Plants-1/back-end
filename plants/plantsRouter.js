const router = require("express").Router();
const db = require("../data/dbConfig");

router.get("/", async (req, res) => {
  const data = await db("plants");
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const valid = await db("users").where({ id });
    if (valid.length > 0) {
      const data = await db("plants").where({ user_id: id });
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "user_id not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "unable to get plants" });
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const valid = await db("users").where({ id });
    if (valid.length > 0) {
      const plantInfo = req.body;
      plantInfo.user_id = id;
      const plantId = await db("plants").insert(plantInfo).returning("id");
      const data = await db("plants").where({ id: plantId }).first();
      res.status(201).json(data);
    } else {
      res.status(400).json({ error: "invalid user id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "problem creating plant" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const valid = await db("plants").where({ id });
    if (valid.length > 0) {
      const newInfo = req.body;
      await db("plants").update(newInfo).where({ id });
      const data = await db("plants").where({ id }).first();
      res.status(200).json({ updated: data });
    } else {
      res.status(400).json({ error: "invalid plant id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "problem updating the plant" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const valid = await db("plants").where({ id });
    if (valid.length > 0) {
      const plantData = await db("plants").where({ id }).first();
      const data = await db("plants").where({ id }).del();
      res.status(200).json({ deleted: plantData });
    } else {
      res.status(400).json({ error: "invalid plant id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "problem deleting the plant" });
  }
});

module.exports = router;
