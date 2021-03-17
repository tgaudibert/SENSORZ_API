exports.up = async function up(knex) {
  await knex.schema.createTable('sensorsnotification_type', table => {
    table
      .increments('id_sensornotification_type')
      .unsigned()
      .notNullable()
      .primary(['sensornotification_type_job_pkey']);
    table.string('notification_type').notNullable();

  });

};


exports.down = async function down(knex) {
  await knex.schema.dropTable('sensorsnotification_type');
};
