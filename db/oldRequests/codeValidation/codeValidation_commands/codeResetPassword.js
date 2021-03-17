var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const { validateUserResetCode } = require('../repository')


const {sendRegisterMail} = require('../../../user_Emailing/main')


const {
  INTERNAL_ERROR,
  FETCH_INFO_ERROR_MESSAGE,
  REGISTER_SUCCESS
  } = require('../constants');



async function codeResetPassword(req, res) {

  const {
    username,
    verification_code
  } = req.body

  try {
    const result = await validateUserResetCode( username, verification_code);
    if(result.rowCount != 0 ){
      return res.status(200).send({ success : "ok", verification_code:verification_code});
    }
    return res.status(401).send({ error: FETCH_INFO_ERROR_MESSAGE });

  } catch (error) {
    debug(error)
    return res.status(500).send({ error: INTERNAL_ERROR });
  }


}

module.exports = codeResetPassword;
