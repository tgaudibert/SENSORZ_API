const repository = require('../repository');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);

const {
  UPDATE_PROFILE_ERROR
  } = require('../constants');


async function updateProfile(req, res, next) {

  const {iduser} = req.user
  let compte;

  try {
    compte = await repository.updateProfile(req.body, iduser);
    debug(compte)
    if(compte.rowCount != 0){
      return res.status(200).send({ success: "ok" });

    }
    return res.status(400).send({ error: UPDATE_PROFILE_ERROR });

  } catch (error) {
    return next(error);
  }

}

module.exports = updateProfile;
