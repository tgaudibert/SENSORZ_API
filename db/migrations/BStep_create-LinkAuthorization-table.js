exports.up = async function up(knex) {
  await knex.schema.createTable('linkauthorization', table => {
    table
      .increments('id_linkauthorization')
      .unsigned()
      .notNullable()
      .primary(['linkauthorization_job_pkey']);
    table.string('name_linkauthorization', 100).notNullable().defaultTo("");

  });

};


exports.down = async function down(knex) {
  await knex.schema.dropTable('linkauthorization');
};
