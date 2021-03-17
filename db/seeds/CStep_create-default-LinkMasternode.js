

exports.seed = async function seed(knex) {
  await knex('linkmasternodes').insert({
    iduser: 1,
    id_masternode:1,
    id_linkauthorization:1,
    isrequesting:0,
    isowner:1
  });
};
