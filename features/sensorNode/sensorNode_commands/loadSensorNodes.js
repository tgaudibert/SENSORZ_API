var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')


const {
  FETCH_INFO_ERROR_MESSAGE,
  INTERNAL_ERROR
  } = require('../constants');



async function loadSensorNodes(req, res, next) {

  const { iduser } = req.user
  const { id_masternode } = req.params

  try {
    sensornodes = await repository.getSensorNodes(iduser);
    return res.status(200).send({success:"success",sensornodes:sensornodes});

  } catch (error) {
    debug(error)
    return next(error);

  }
}

module.exports = loadSensorNodes;
