var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  INTERNAL_ERROR
  } = require('../constants');



async function loadMasterNodes(req, res, next) {

  const { iduser } = req.user

  try{
    const masternodes = await repository.getMasterNodes( iduser );
    debug(masternodes)
    return res.status(200).send({success:"ok", masternodes:masternodes});

  }catch(error){
    debug(error)
    return next(error);

  }
}

module.exports = loadMasterNodes;
