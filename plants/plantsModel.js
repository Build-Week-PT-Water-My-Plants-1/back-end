const db = require("../data/dbConfig");

module.exports = {
  findUserById,
  findPlantById,
  findPlantsByUserId,
  add,
  update,
  remove,
};

//? could also write it this way
// const findBy = (id, db) => {
//   db(db).where({ id });
// };

function findUserById(id) {
  return db("users").where({ id }).first();
}

function findPlantById(id) {
  return db("plants").where({ id }).first();
}

function findPlantsByUserId(user_id) {
  return db("plants").where({ user_id });
}

// function add(plantInfo) {
//   return db("plants")
//     .insert(plantInfo)
//     .then((ids) => {
//       return findById(ids[0]);
//     });
// }

async function add (plantInfo) {
  const plantId = await db("plants").insert(plantInfo).returning("id");
  const data = await findPlantById(plantId[0]);
  return data;
};

// function update(newInfo, id) {
//   return db("plants")
//     .where({ id })
//     .update(newInfo)
//     .then((ids) => {
//       return findById(id);
//     });
// }

async function update (newInfo, id) {
  const original = await findPlantById(id)
  const updated = {...original, ...newInfo}
  const plantId = await db("plants").where({ id }).update(updated).returning("id");
  return await findPlantById(id);
};

async function remove(id) {
  const plantData = await findPlantById(id);
  await db("plants").where({ id }).del();
  return plantData
}
