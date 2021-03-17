var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const { validateUserResetCode } = require('../repository')


const {sendRegisterMail} = require('../../../user_Emailing/main')


const {
  INTERNAL_ERROR,
  INVALID_RESETCODE
  } = require('../constants');



async function codeResetPassword(req, res, next) {

  const {
    username,
    verification_code
  } = req.body

  try {
    const result = await validateUserResetCode( username, verification_code);
    if(result.rowCount != 0 ){
      return res.status(200).send({ success : "ok", verification_code:verification_code});
    }
    return res.status(400).send({ error: INVALID_RESETCODE});

  } catch (error) {
    debug(error)
    return next(error);
  }


}

module.exports = codeResetPassword;
