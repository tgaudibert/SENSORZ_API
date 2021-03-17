var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  INTERNAL_ERROR
  } = require('../constants');



async function createSensorNode(req, res) {

  debug(req.body)
  const { iduser } = req.user

  try{
    await repository.createSensorNode(req.body, iduser );
    return res.status(200).send({success:"SENSOR SUCCESSFULLY CREATED"});

  }catch(error){
    debug(error)
    req.session = { errors: INTERNAL_ERROR};
    return res.status(500).send(req.session);

  }
}

module.exports = createSensorNode;
