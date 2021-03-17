const repository = require('../repository');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);



const {sendResetPassMail} = require('../../../user_Emailing/main')


  async function resetPassword(req, res, next) {

    let compte = {};
    const verification_code = '1234'
    const { username, iduser } = req.user
    debug(req.body)

    try {
      await repository.resetPassword( verification_code, username);
      compte = await repository.getUser( username );
      if(compte.rowCount != 0 ){
        sendResetPassMail(username, verification_code)
      }
      return res.status(200).send({ success : "ok"});

    } catch (error) {
      return next(error);
    }
  }

module.exports = resetPassword;
