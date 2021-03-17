exports.up = async function up(knex) {
  await knex.schema.createTable('userdaily', table => {
    table
      .increments('iduserdaily')
      .unsigned()
      .unique()
      .notNullable()
      .primary();
    table.string('posts_count', 300).notNullable();
    table.string('followers_count', 300).notNullable();
    table.string('followings_count', 300).notNullable();
    table.timestamp('userdaily_date').defaultTo(knex.fn.now());
    table
      .integer('iduser')
      .notNullable()
      .unsigned()


  });

  await knex.schema.table("userdaily", table => {
        table.foreign('iduser').references('users.iduser');
  });


};

exports.down = async function down(knex) {
  await knex.schema.dropTable('userdaily');
};
