var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  INTERNAL_ERROR
  } = require('../constants');



async function createMasterNode(req, res, next) {

  debug(req.body)
  const { iduser } = req.user
  const { masternode_name } = req.body

  try{
    await repository.createMasterNode(masternode_name, iduser );
    return res.status(200).send({success:"MASTERNODE_SUCCESS_CREATION"});

  }catch(error){
    debug(error)
    return next(error);

  }
}

module.exports = createMasterNode;
