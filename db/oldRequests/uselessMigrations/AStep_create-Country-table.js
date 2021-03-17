exports.up = async function up(knex) {
  await knex.schema.createTable('country', table => {
    table
      .increments('idcountry')
      .unsigned()
      .unique()
      .notNullable()
      .primary();
    table.string('countryname').notNullable();
    table.string('countrycode').notNullable();
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('country');
};
