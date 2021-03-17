const { wrap } = require('async-middleware');

const generateMasterKey = require('./masterNode_commands/generateMasterKey');
const updateMasterNode = require('./masterNode_commands/updateMasterNode');
const createMasterNode = require('./masterNode_commands/createMasterNode');
const loadMasterNodes = require('./masterNode_commands/loadMasterNodes');
const validateMasterNodePayload = require('./masterNode_commands/validateMasterNodePayload');


module.exports = (router, middlewares = []) => {
  router.post('/masternode/update', middlewares.map(middleware => wrap(middleware)), wrap(validateMasterNodePayload), wrap(updateMasterNode));
  router.post('/masternode/create', middlewares.map(middleware => wrap(middleware)), wrap(validateMasterNodePayload), wrap(createMasterNode));
  router.get('/masternodes', middlewares.map(middleware => wrap(middleware)), wrap(loadMasterNodes));
  router.get('/masternode/:id_masternode/generate_key', middlewares.map(middleware => wrap(middleware)), wrap(generateMasterKey));
  return router;
};
