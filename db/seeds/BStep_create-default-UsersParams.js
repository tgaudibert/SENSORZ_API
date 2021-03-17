
exports.seed = async function seed(knex) {
  await knex('usersparams').insert({
    push_notification: 1,
    email_subscription: 1,
    iduser:1
  });

  await knex('usersparams').insert({
    push_notification: 1,
    email_subscription: 1,
    iduser:2
  });
};
