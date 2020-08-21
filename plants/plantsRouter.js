const router = require("express").Router();
const db = require("../data/dbConfig");

router.get("/", async (req, res) => {
  const data = await db("plants");
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await db("plants").where({ user_id: id });
  res.status(200).json(data);
});

router.post("/:id", async (req, res) => {
  const user_id = req.params.id;
  const plantInfo = req.body;
  plantInfo.user_id = user_id;
  const plantId = await db("plants").insert(plantInfo);
  const data = await db("plants").where({ id: plantId }).first();
  res.status(201).json(data);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  await db("plants").update(newInfo).where({ id });
  const data = await db("plants").where({ id }).first();
  res.status(200).json({ updated: data });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const plantData = await db("plants").where({ id }).first();
  const data = await db("plants").where({ id }).del();
  res.status(200).json({ deleted: plantData });
});

module.exports = router;
