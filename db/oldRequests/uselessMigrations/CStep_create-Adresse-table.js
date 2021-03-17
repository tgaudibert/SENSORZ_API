exports.up = async function up(knex) {
  await knex.schema.createTable('address', table => {
    table
      .increments('idaddress')
      .unsigned()
      .unique()
      .notNullable()
      .primary();
    table.string('address', 300).notNullable();
    table.string('city', 200).notNullable();
    table.string('postalcode', 60).notNullable();
    table
      .integer('iduser')
      .unsigned()

    table
      .integer('idcountry')
      .unsigned()


  });

  await knex.schema.table("address", table => {
        table.foreign('idcountry').references('country.idcountry');
        table.foreign('iduser').references('users.iduser');
  });


};

exports.down = async function down(knex) {
  await knex.schema.dropTable('address');
};
