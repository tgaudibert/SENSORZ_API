

exports.seed = async function seed(knex) {
  await knex('linkauthorization').insert({
    name_linkauthorization:"ADMIN"
  });
  await knex('linkauthorization').insert({
    name_linkauthorization:"MOD"
  });
  await knex('linkauthorization').insert({
    name_linkauthorization:"VIEWER"
  });
};
