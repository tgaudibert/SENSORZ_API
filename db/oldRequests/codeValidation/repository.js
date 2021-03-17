const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);





async function validateUserRegistrationCode( username, verification_code ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE
        users
      SET
        isemailverified = 1,
        email_verified_at = $1
      WHERE username = $2
      AND verification_code = $3
      AND password = 'preregistered'
      AND created_at <  date_trunc('day'  , now()) + interval '1 day'
    `,
    [new Date(),username, verification_code],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        debug(result)
        resolve(result);

      }
    );
  })
}



async function validateUserResetCode( username, verification_code ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE
        users
      SET
        isreset = 1
      WHERE username = $1
      AND verification_code = $2
      AND reset_request_at <  date_trunc('day'  , now()) + interval '1 day'
    `,
    [username, verification_code],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        debug(result)
        resolve(result);

      }
    );
  })
}


module.exports = {
  validateUserRegistrationCode,
  validateUserResetCode
};
