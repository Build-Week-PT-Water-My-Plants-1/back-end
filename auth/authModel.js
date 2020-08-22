const db = require("../data/dbConfig");

module.exports = {
  findById,
  register,
  findByUsername,
  update,
  remove,
};

function findById(id) {
  return db("users").where({ id }).first().select("username", "phonenumber");
}

// function register(userInfo) {
//   return db("users")
//     .insert(userInfo)
//     .then((ids) => {
//       return findById(ids[0]);
//     });
// }

const register = async (userInfo) => {
  const userId = await db("users").insert(userInfo).returning("id");
  const data = await findById(userId[0]);
  return data;
};

function findByUsername(username) {
  return db("users").where({ username }).first();
}

const update = async (user) => {
  const userId = await db("users").where({ id: user.id }).insert(user).returning("id");
  const data = await findById(userId[0]);
  return data;
};

const remove = async (id) => {
  const userInfo = await findById(id);
  await db("users").where({ id }).del();
  return userInfo;
};
