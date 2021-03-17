exports.up = async function up(knex) {
  await knex.schema.createTable('users', table => {
    table
      .increments('iduser')
      .unsigned()
      .notNullable()
      .primary(['user_job_pkey']);
    table.string('username', 100).notNullable();
    table.string('name', 60).notNullable();
    table.string('profilepic_url').notNullable().defaultTo('')
    table.integer('password_retries').notNullable().defaultTo(0);
    table.integer('isreset').notNullable().defaultTo(0);
    table.integer('isemailverified').notNullable().defaultTo(0);
    table.string('password', 60).notNullable();
    table.string('lang', 60)
    table.string('verification_code', 60).notNullable();
    table.timestamp('email_verified_at')
    table.timestamp('reset_request_at')
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique('username');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('users');
};
