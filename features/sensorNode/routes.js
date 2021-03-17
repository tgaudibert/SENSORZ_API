const { wrap } = require('async-middleware');
const loadSensorNodes = require('./sensorNode_commands/loadSensorNodes');
const loadWaitingSensors = require('./sensorNode_commands/loadWaitingSensors');
const updateSensor = require('./sensorNode_commands/updateSensor');
const deleteSensorNode = require('./sensorNode_commands/deleteSensorNode');
const validateUpdateSensornodePayload = require('./sensorNode_commands/validateUpdateSensornodePayload');


module.exports = (router, middlewares = []) => {
  //router.get('/:id_sensorsmaster/sensor/data', middlewares.map(middleware => wrap(middleware)), wrap(loadSensordata));
  router.get('/:id_masternode/sensors/waiting',middlewares.map(middleware => wrap(middleware)),  wrap(loadWaitingSensors));
  router.get('/:id_masternode/sensors',middlewares.map(middleware => wrap(middleware)),  wrap(loadSensorNodes));
  router.post('/sensors/me/update',middlewares.map(middleware => wrap(middleware)),wrap(validateUpdateSensornodePayload), wrap(updateSensor));
  //router.post('/sensors/me/create',middlewares.map(middleware => wrap(middleware)),  wrap(createSensorNode));
  router.get('/sensors/:id_sensornode/delete',middlewares.map(middleware => wrap(middleware)),  wrap(deleteSensorNode));
  return router;
};
