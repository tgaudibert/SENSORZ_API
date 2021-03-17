exports.up = async function up(knex) {
  await knex.schema.createTable('sensordatanodes', table => {
    table
      .increments('id_sensordatanode')
      .unsigned()
      .notNullable()
      .primary(['sensordatanode_job_pkey']);
    table.json('data_sensor').notNullable();
    table.integer('battery_porcent').notNullable();
    table.integer('filling_porcent').notNullable();
    table.string('snr', 60).notNullable();
    table.string('rssi', 60).notNullable();
    table.integer('wakeup_numb').notNullable()
    table
      .integer('id_sensornode')
      .unsigned()
      .notNullable()
    table
      .timestamp('added_at')
      .notNullable()
      .defaultTo(knex.fn.now());

  });

  await knex.schema.table("sensordatanodes", table => {
        table.foreign('id_sensornode').references('sensornodes.id_sensornode');
  });
};


exports.down = async function down(knex) {
  await knex.schema.dropTable('sensordatanodes');
};
