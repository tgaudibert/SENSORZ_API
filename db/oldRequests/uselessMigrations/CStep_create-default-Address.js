

exports.seed = async function seed(knex) {
  await knex('address').insert(
    {
      address: '22 rue de la peronnette',
      city: '22 rue de la peronnette',
      postalcode: '35310',
      idcountry: 1,
      iduser: 1
    }
  );
};
