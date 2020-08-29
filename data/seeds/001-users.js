const bcrypt = require("bcryptjs");

const password = "pass";

const hash = bcrypt.hashSync(password, 12);

exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "user1",
      password: hash,
      phonenumber: "111-111-1111",
    },
    {
      username: "user2",
      password: hash,
      phonenumber: "222-222-2222",
    },
    {
      username: "user3",
      password: hash,
      phonenumber: "333-333-3333",
    },
  ]);
};
