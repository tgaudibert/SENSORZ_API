var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  INTERNAL_ERROR,
  DELETE_COMMUNITY_ERROR
  } = require('../constants');



async function deleteCommunity(req, res, next) {

  const { iduser } = req.user
  const { id_masternode } = req.params
  let result;

  try {
    result = await repository.deleteCommunity( iduser , id_masternode);
    debug(result)
    if(result.rowCount !=0){
      return res.status(200).send({success:"success"});
    }
    return res.status(400).send({error:DELETE_COMMUNITY_ERROR});

  } catch (error) {
    debug(error)
    return next(error);
  }

}

module.exports = deleteCommunity;
