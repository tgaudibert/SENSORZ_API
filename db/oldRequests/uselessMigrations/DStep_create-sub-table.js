exports.up = async function up(knex) {
  await knex.schema.createTable('sub', table => {
    table
      .increments('idsub')
      .unsigned()
      .unique()
      .notNullable()
      .primary();
    table.integer('sub_type').notNullable().defaultTo(1);
    table.timestamp('sub_date').notNullable();
    table.timestamp('sub_expiration').notNullable();
    table.integer('iduser')
    table.string('idsub_stripe')
    table.string('idcustomer_stripe')
    table.string('idsub_paypal')
    table.string('idcustomer_paypal')
    table.string('sub_guid')
    table.string('email').notNullable();
    table.string('name').notNullable();
  });

};

exports.down = async function down(knex) {
  await knex.schema.dropTable('sub');
};
