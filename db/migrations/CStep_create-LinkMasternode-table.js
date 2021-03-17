exports.up = async function up(knex) {
  await knex.schema.createTable('linkmasternodes', table => {
    table
      .increments('id_linkmasternode')
      .unsigned()
      .notNullable()
      .primary(['linkmasternode_job_pkey']);
    table.integer('id_linkauthorization')
    table.integer('isrequesting').notNullable().defaultTo(1);
    table.integer('isowner').notNullable().defaultTo(0);
    table
      .integer('iduser')
      .notNullable()
      .unsigned()
    table
      .integer('id_masternode')
      .notNullable()
      .unsigned()
    table
      .timestamp('link_created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.table("linkmasternodes", table => {
        table.foreign('id_masternode').references('masternodes.id_masternode');
        table.foreign('iduser').references('users.iduser');
        table.foreign('id_linkauthorization').references('linkauthorization.id_linkauthorization');
  });
};


exports.down = async function down(knex) {
  await knex.schema.dropTable('linkmasternodes');
};
