
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'user1',
          password: 'pass',
          phonenumber: '111-111-1111'
        },
        {
          username: 'user2',
          password: 'pass',
          phonenumber: '222-222-2222'
        },
        {
          username: 'user3',
          password: 'pass',
          phonenumber: '333-333-3333'
        }
      ]);
    });
};
