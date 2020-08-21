
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments()
        tbl.text('username')
            .unique()
            .notNullable()
        tbl.text('password')
            .notNullable()
        tbl.text('phonenumber')
            .unique()
            .notNullable()
    })
    .createTable('plants', tbl => {
        tbl.increments()
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
        tbl.text('nickname')
            .notNullable()
        tbl.text('species')
            .notNullable()
        tbl.text('h2ofrequency')
            .notNullable()
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('plants')
    .dropTableIfExists('users')
};
