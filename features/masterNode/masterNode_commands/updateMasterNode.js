var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')

const {
  INTERNAL_ERROR,
  UPDATE_MASTERNODE_ERROR
  } = require('../constants');



async function updateMasterNode(req, res, next) {

  const { iduser } = req.user
  debug(req.body)

  try{
    const result = await repository.updateMasterNode( req.body, iduser );
    if(result.rowCount != 0){
      return res.status(200).send({success:'MASTER SUCCESSFULLY UPDATED'});
    }
    return res.status(400).send({error: UPDATE_MASTERNODE_ERROR});

  }catch(error){
    debug(error)
    return next(error);

  }
}

module.exports = updateMasterNode;
