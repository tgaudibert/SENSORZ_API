exports.up = async function up(knex) {
  await knex.schema.createTable('usersparams', table => {
    table
      .increments('id_userparams')
      .unsigned()
      .notNullable()
      .primary(['user_job_pkey']);
    table.integer('push_notification').notNullable().defaultTo(1);
    table.integer('email_subscription').notNullable().defaultTo(1);
    table
      .integer('iduser')
      .notNullable()
      .unsigned()
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

  });

  await knex.schema.table("usersparams", table => {
        table.foreign('iduser').references('users.iduser');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('usersparams');
};
