var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')
const {appNotification} = require('../../../user_Notifications/main')

const {
  INTERNAL_ERROR,
  MASTERNODE_CONNECTED
  } = require('../constants');



async function activateMasterNode(req, res, next) {

  const { id_masternode } = req.masternode
  debug(id_masternode)
  try{
    await repository.activateMasterNode( id_masternode );
    const users = await repository.getMasternodeUsers( id_masternode )
    appNotification.sendNotification({message:MASTERNODE_CONNECTED, users:users})
    return res.status(200).send({success:'ok'});

  }catch(error){
    debug(error)
    return next(error);

  }
}

module.exports = activateMasterNode;
