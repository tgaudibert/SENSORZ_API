exports.up = async function up(knex) {
  await knex.schema.createTable('sensorsnotification', table => {
    table
      .increments('id_sensornotification')
      .unsigned()
      .notNullable()
      .primary(['sensornotification_job_pkey']);
    table.integer('id_sensornotification_type')
      .unsigned()
      .notNullable()
    table
      .integer('id_sensornode')
      .unsigned()
      .notNullable()
    table
      .timestamp('notified_at')
      .notNullable()
      .defaultTo(knex.fn.now());

  });

  await knex.schema.table("sensorsnotification", table => {
        table.foreign('id_sensornode').references('sensornodes.id_sensornode');
        table.foreign('id_sensornotification_type').references('sensorsnotification_type.id_sensornotification_type');
  });
};


exports.down = async function down(knex) {
  await knex.schema.dropTable('sensorsnotification');
};
