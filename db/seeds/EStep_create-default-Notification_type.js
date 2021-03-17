
const data_sensor = JSON.stringify({sensor1:1,sensor2:0})

exports.seed = async function seed(knex) {
  await knex('sensorsnotification_type').insert({
    notification_type:'LOW_BATTERY'
  });

  await knex('sensorsnotification_type').insert({
    notification_type:'WEAK_SIGNAL'
  });

  await knex('sensorsnotification_type').insert({
    notification_type:'LOW_LEVEL'
  });

  await knex('sensorsnotification_type').insert({
    notification_type:'NEW_MASTERNODE'
  });

  await knex('sensorsnotification_type').insert({
    notification_type:'MASTERNODE_CONNECTED'
  });

  await knex('sensorsnotification_type').insert({
    notification_type:'NEW_PENDING_SENSOR'
  });
};
