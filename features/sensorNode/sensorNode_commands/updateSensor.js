var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  FETCH_INFO_ERROR_MESSAGE
  } = require('../constants');



async function addSensor(req, res, next) {

  const { iduser } = req.user
  const data = req.body

  try {
    await repository.updateSensorNode(data, iduser);
    return res.status(200).send({success:"success"});

  } catch (error) {
    debug(error)
    return next(error);

  }
}

module.exports = addSensor;
