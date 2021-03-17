const repository = require('../repository');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);


const {
  INTERNAL_ERROR,
  NEW_PASSWORD_ERROR
  } = require('../constants');


async function newPassword(req, res, next) {

  let compte = {};
  const {
    username,
    verification_code,
    password,
    confirm_password
   } = req.body

  try {
    compte = await repository.newPassword( req.body );
    debug(compte.rowCount)
    if(compte.rowCount != 0 ){
      return res.status(200).send({ success : "ok"});
    }
    return res.status(400).send({ error : NEW_PASSWORD_ERROR});

  } catch (error) {
    debug(error)
    return next(error);

  }
}

module.exports = newPassword;
