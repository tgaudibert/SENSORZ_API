var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  INTERNAL_ERROR
  } = require('../constants');



async function loadCommunity(req, res, next) {

  const { iduser } = req.user
  const { id_masternode } = req.params

  try {
    const users = await repository.getCommunity( iduser , id_masternode);
    debug(users)
    return res.status(200).send({success:"success",users:users});

  } catch (error) {
    debug(error)
    return next(error);

  }
}

module.exports = loadCommunity;
