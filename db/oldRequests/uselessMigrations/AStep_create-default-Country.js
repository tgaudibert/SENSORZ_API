
exports.seed = async function seed(knex) {
  await knex('country').insert(
    {
      countrycode: 'FR',
      countryname: 'FRANCE',
    }
  );
};
