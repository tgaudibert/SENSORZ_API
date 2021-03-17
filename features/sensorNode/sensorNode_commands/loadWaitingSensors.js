var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  INTERNAL_ERROR
  } = require('../constants');



async function loadWaitingSensors(req, res, next) {

  const { iduser } = req.user
  const { id_masternode } = req.params

  try {
    sensornodes_waiting = await repository.getWaitingSensorNodes(iduser);
    return res.status(200).send({success:"success",sensornodes_waiting:sensornodes_waiting});

  } catch (error) {
    debug(error)
    return next(error);

  }
}

module.exports = loadWaitingSensors;
