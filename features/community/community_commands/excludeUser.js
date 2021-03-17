var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  EXCLUDE_USER_ERROR,
  INTERNAL_ERROR
  } = require('../constants');



async function excludeUser(req, res, next) {

  const { iduser } = req.user
  const { id_masternode, username } = req.body
  let result;

  try {
    result = await repository.excludeLinkUserCommunity( username , id_masternode ,iduser);
    debug(result)
    if(result.rowCount !=0){
      return res.status(200).send({success:"success"});
    }
    return res.status(400).send({error:EXCLUDE_USER_ERROR});

  } catch (error) {
    debug(error)
    return next(error);

  }

}

module.exports = excludeUser;
