var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')
const {appNotification} = require('../../../user_Notifications/main')

const {
  INTERNAL_ERROR,
  FETCH_INFO_ERROR_MESSAGE
  } = require('../constants');





async function activateSensorNode(req, res, next) {

  const { id_masternode } = req.masternode
  const { id_sensornode } = req.params

  try{
    const users = await repository.getMasternodeUsers( id_masternode )
    appNotification.sendNotification({message:'SENSORNODE_CONNECTED', users:users})
    return res.status(200).send({success:'ok'});

  }catch(error){
    debug(error)
    req.session = { errors: FETCH_INFO_ERROR_MESSAGE};
    return next(error);

  }
}

module.exports = activateSensorNode;
