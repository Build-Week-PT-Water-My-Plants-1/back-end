const db = require("../data/dbConfig");

module.exports = {
  findById,
  register,
  findByUsername,
  findByPhonenumber,
  update,
  remove,
};

function findById(id) {
  return db("users").where({ id }).first().select("id", "username", "phonenumber");
}

// function register(userInfo) {
//   return db("users")
//     .insert(userInfo)
//     .then((ids) => {
//       return findById(ids[0]);
//     });
// }

async function register(userInfo) {
  const userId = await db("users").insert(userInfo).returning("id");
  const data = await findById(userId[0]);
  return data;
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}

function findByPhonenumber(phonenumber) {
  return db("users").where({ phonenumber }).first();
}

async function update(newInfo, id) {
  const original = await findById(id);
  const updated = { ...original, ...newInfo };
  console.log("from authmodel: ", updated);
  const userId = await db("users").where({ id }).update(updated).returning("id");
  const data = await findById(id);
  return data;
}

async function remove(id) {
  const userInfo = await findById(id);
  await db("users").where({ id }).del();
  return userInfo;
}
