

exports.seed = async function seed(knex) {
  await knex('sensornodes').insert({
    sensornode_name: 'admini',
    id_masternode:1,
    id_device: "1728287EGID",
    capacity: 1000
  });

  await knex('sensornodes').insert({
    sensornode_name: 'admi2ni',
    id_masternode:1,
    id_device: "19217392HE2",
    sensornode_product: "Chlore",
    capacity: 1000,
    isactive:1,
    iswaiting:0
  });


  await knex('sensornodes').insert({
    sensornode_name: 'admini',
    id_masternode:2,
    id_device: "102727E2G73",
    capacity: 1000
  });

  await knex('sensornodes').insert({
    sensornode_name: 'admi2ni',
    id_masternode:1,
    id_device: "263637028HE32",
    sensornode_product: "Chlore",
    capacity: 1000,
    isactive:2,
    iswaiting:0
  });

};
