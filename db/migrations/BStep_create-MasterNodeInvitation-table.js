exports.up = async function up(knex) {
  await knex.schema.createTable('masternodeinvitation', table => {
    table
      .increments('id_masternodeinvitation')
      .unsigned()
      .notNullable()
      .primary(['masternode_job_pkey']);
    table.string('verification_code', 60).notNullable();
    table.string('email').notNullable();
    table
      .integer('id_masternode')
      .notNullable()
      .unsigned()
    table
      .timestamp('invited_at')
      .notNullable()
      .defaultTo(knex.fn.now());

  });

  await knex.schema.table("masternodeinvitation", table => {
        table.foreign('id_masternode').references('masternodes.id_masternode');
  });

};

exports.down = async function down(knex) {
  await knex.schema.dropTable('masternodeinvitation');
};
