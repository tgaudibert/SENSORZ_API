require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const repository = require('../repository');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const {sendResetPassMail} = require('../../../user_Emailing/main')

async function resetPassword(req, res, next) {


  const verification_code = process.env.VERIFICATION_CODE || Math.floor(100000 + Math.random() * 900000).toString()
  const { username } = req.body
  debug(req.body)

  try {
    await repository.resetPassword( verification_code, username);
    const compte = await repository.getUser( username );
    debug(compte)
    if(compte.rowCount != 0 ){
      sendResetPassMail(username, verification_code)
    }

  } catch (error) {
    //NEED TO DEAL WITH ERROR
    debug(error)
    return next(error);
  }

  return res.status(200).send({ success : "ok"});
}

module.exports = resetPassword;
