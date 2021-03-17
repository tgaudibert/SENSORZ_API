var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  INTERNAL_ERROR,
  DELETE_SENSORNODE_ERROR
  } = require('../constants');



async function deleteSensorNode(req, res, next) {

  const { iduser } = req.user
  const { id_sensornode } = req.params
  let result;

  try{
    await repository.deleteSensorDataNode(id_sensornode, iduser );
    await repository.deleteSensorNotifications( id_sensornode, iduser)
    result = await repository.deleteSensorNode(id_sensornode, iduser );

  }catch(error){
    debug(error)
    return next(error);
  }

  if(result.rowCount!=0){
    return res.status(200).send({success:"ok"});
  }else{
    return res.status(400).send({ error: DELETE_SENSORNODE_ERROR});
  }
}

module.exports = deleteSensorNode;
