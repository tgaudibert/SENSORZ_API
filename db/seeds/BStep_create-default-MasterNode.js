

exports.seed = async function seed(knex) {
  await knex('masternodes').insert({
    masternode_name: 'principal',
    syncword: 12,
    isactive: 1
  });


  await knex('masternodes').insert({
    masternode_name: 'principal',
    syncword: 12,
    isactive: 1
  });

};
