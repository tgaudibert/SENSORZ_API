const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  const hashedPass = await bcrypt.hash('Babababa35', 5);
  await knex('users').insert({
    name: 'admin',
    username: 'admin@gmail.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
    isemailverified:1,
    verification_code:'62739G82',
    lang:'fr'
    //email_verified_at: new Date(),
  });

  await knex('users').insert({
    name: 'admin',
    username: 'notmonotom@gmail.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
    isemailverified:1,
    verification_code:'62739G82',
    lang:'fr'
    //email_verified_at: new Date(),
  });
};
