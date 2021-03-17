exports.up = async function up(knex) {
  await knex.schema.createTable('masternodes', table => {
    table
      .increments('id_masternode')
      .unsigned()
      .notNullable()
      .primary(['masternode_job_pkey']);
    table.string('masternode_name', 100).notNullable().defaultTo("principal");
    table.integer('syncword').notNullable()
    table.integer('isactive').notNullable().defaultTo(0);
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());

  });


};

exports.down = async function down(knex) {
  await knex.schema.dropTable('masternodes');
};
