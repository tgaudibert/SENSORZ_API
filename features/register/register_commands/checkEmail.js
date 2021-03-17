require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const { createUser } = require('../repository')
const fs = require('fs')
var privateKEY  = fs.readFileSync('./keys/jwtRS256.key', 'utf8');
const authOptions = require('../../../auth/authfile')
const jwt = require('jsonwebtoken');

const {sendRegisterMail} = require('../../../user_Emailing/main')


const {
  EMAIL_AVAILABLE ,
  INTERNAL_ERROR,
  USER_ALREADY_EXISTS,
  USERNAME_EMAIL_ERROR
  } = require('../constants');



async function checkEmail(req, res, next) {

  const { username } = req.body

  try {
    console.log(process.env.VERIFICATION_CODE)
    const verification_code = process.env.VERIFICATION_CODE || Math.floor(100000 + Math.random() * 900000).toString()

    const result = await createUser( username ,verification_code);
    if(result.rowCount != 0){
      sendRegisterMail(username, verification_code)
      return res.status(200).send({ success: EMAIL_AVAILABLE });
    }
    return res.status(400).send({ error: USER_ALREADY_EXISTS});
  } catch (error) {
    debug(error)
    if(error.code == 23502){
      return res.status(400).send({ error: USER_ALREADY_EXISTS});
    }
    return next(error);

  }
}

module.exports = checkEmail;
