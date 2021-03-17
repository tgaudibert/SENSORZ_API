
const data_sensor = JSON.stringify({sensor1:1,sensor2:0})

exports.seed = async function seed(knex) {
  await knex('sensordatanodes').insert({
    data_sensor: JSON.stringify({sensor1:1,sensor2:0}),
    battery_porcent: 87,
    wakeup_numb: 1,
    id_sensornode:1,
    filling_porcent:50,
    snr:30,
    rssi:-70
  });

  await knex('sensordatanodes').insert({
    data_sensor: JSON.stringify({sensor1:1,sensor2:0}),
    battery_porcent: 87,
    wakeup_numb: 1,
    id_sensornode:2,
    filling_porcent:25,
    snr:30,
    rssi:-70
  });


  await knex('sensordatanodes').insert({
    data_sensor: JSON.stringify({sensor1:1,sensor2:0}),
    battery_porcent: 87,
    wakeup_numb: 1,
    id_sensornode:3,
    filling_porcent:50,
    snr:30,
    rssi:-70
  });

  await knex('sensordatanodes').insert({
    data_sensor: JSON.stringify({sensor1:1,sensor2:0}),
    battery_porcent: 87,
    wakeup_numb: 1,
    id_sensornode:4,
    filling_porcent:25,
    snr:30,
    rssi:-70
  });

};
