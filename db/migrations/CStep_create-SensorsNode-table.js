exports.up = async function up(knex) {
  await knex.schema.createTable('sensornodes', table => {
    table
      .increments('id_sensornode')
      .unsigned()
      .notNullable()
      .primary(['sensornode_job_pkey']);
    table.string('sensornode_name', 100).notNullable().defaultTo("");
    table.string('id_device', 60).unique().notNullable();
    table.integer('isactive').notNullable().defaultTo(0);
    table.integer('iswaiting').notNullable().defaultTo(1);
    table.integer('capacity');
    table.string('sensornode_product', 100).notNullable().defaultTo("");
    table
      .integer('id_masternode')
      .notNullable()
      .unsigned()
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.table("sensornodes", table => {
        table.foreign('id_masternode').references('masternodes.id_masternode');
  });
};


exports.down = async function down(knex) {
  await knex.schema.dropTable('sensornodes');
};
