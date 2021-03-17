exports.up = async function up(knex) {
  await knex.schema.createTable('following', table => {
    table
      .increments('idfollowing')
      .unsigned()
      .unique()
      .notNullable()
      .primary();
    table.string('following_username', 300).notNullable();
    table.string('posts_count', 300).notNullable();
    table.string('followers_count', 300).notNullable();
    table.string('followings_count', 300).notNullable();
    table.string('username_pictureurl', 3000).notNullable();
    table.string('hashtag', 30).notNullable();
    table.integer('isfollowing').notNullable().defaultTo(1);
    table.timestamp('following_date').defaultTo(knex.fn.now());
    table
      .integer('iduser')
      .notNullable()
      .unsigned()


  });

  await knex.schema.table("following", table => {
        table.foreign('iduser').references('users.iduser');
  });


};

exports.down = async function down(knex) {
  await knex.schema.dropTable('following');
};
