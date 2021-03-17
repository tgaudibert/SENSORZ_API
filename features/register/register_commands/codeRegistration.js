var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const { validateUserRegistrationCode} = require('../repository')


const {sendRegisterMail} = require('../../../user_Emailing/main')


const {
  INVALID_REGISTRATION_CODE,
  INTERNAL_ERROR
  } = require('../constants');



async function codeRegistration(req, res, next) {

  const {
    username,
    verification_code
  } = req.body

  try {
    const result = await validateUserRegistrationCode( username, verification_code);
    if(result.rowCount !=0){
      return res.status(200).send({ success : "ok", verification_code:verification_code});
    }
    return res.status(400).send({ error: INVALID_REGISTRATION_CODE });

  } catch (error) {
    debug(error)
    return next(error);

  }


}

module.exports = codeRegistration;
