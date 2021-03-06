exports.seed = function (knex) {
  return knex("plants").insert([
    {
      user_id: 1,
      nickname: "the nickname",
      species: "species 1",
      h2ofrequency: "once daily",
    },
    {
      user_id: 1,
      nickname: "the nickname",
      species: "species 2",
      h2ofrequency: "twice daily",
    },
    {
      user_id: 2,
      nickname: "the nickname",
      species: "species 1",
      h2ofrequency: "once daily",
    },
    {
      user_id: 2,
      nickname: "the nickname",
      species: "species 2",
      h2ofrequency: "twice daily",
    },
    {
      user_id: 2,
      nickname: "the nickname",
      species: "species 3",
      h2ofrequency: "every other day",
    },
  ]);
};
