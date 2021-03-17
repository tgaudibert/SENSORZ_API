exports.up = async function up(knex) {
  await knex.schema.createTable('invoice', table => {
    table
      .increments('idinvoice')
      .unsigned()
      .unique()
      .notNullable()
      .primary();

    table.integer('idsub').notNullable();
    table.string('invoice_id').notNullable();
    table.string('address').notNullable();
    table.string('postal_code').notNullable();
    table.string('country').notNullable();
    table.string('city').notNullable();
    table.string('company');
  });

  await knex.schema.table("invoice", table => {
        table.foreign('idsub').references('sub.idsub');
  });

};

exports.down = async function down(knex) {
  await knex.schema.dropTable('invoice');
};
