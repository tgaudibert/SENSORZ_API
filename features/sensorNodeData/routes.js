const { wrap } = require('async-middleware');
const insertSensordata = require('./sensorNodeData_commands/insertSensordata');
const activateMasterNode = require('./sensorNodeData_commands/activateMasterNode');
const activateSensorNode = require('./sensorNodeData_commands/activateSensorNode');

module.exports = (router, middlewares = []) => {
  router.post('/sensor/data', middlewares.map(middleware => wrap(middleware)), wrap(insertSensordata));
  router.get('/activate/masternode', middlewares.map(middleware => wrap(middleware)), wrap(activateMasterNode));
  //router.get('/activate/sensornode/:id_sensornode', middlewares.map(middleware => wrap(middleware)), wrap(activateSensorNode));
  return router;
};
