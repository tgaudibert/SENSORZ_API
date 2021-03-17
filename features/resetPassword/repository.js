const Pool = require('pg').Pool
const bcrypt = require('bcrypt');
const config = require('../../db/postgresfile')
const pool = new Pool(config)
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);





async function resetPassword( verification_code, username ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE
        users
      SET password = 'reset',
      reset_request_at = $1,
      verification_code = $2
      WHERE username = $3
      AND isemailverified = 1`,
    [new Date(), verification_code, username],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        debug(result.rows[0])
        resolve(result.rows[0]);

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


async function newPassword( data ){
  const hashedPass = await bcrypt.hash(data.password, 5);
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE
        users
      SET
        updated_at= $1,
        password = $2,
        isreset = 0
      WHERE username = $3
      AND verification_code = $4
      AND isemailverified = 1
      AND isreset = 1
        `,
    [new Date(), hashedPass, data.username, data.verification_code],
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



async function getUser( username ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        username
      FROM users
      WHERE username = $1
      AND isemailverified = 1`,
    [username],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        debug(result.rows[0])
        resolve(result.rows[0]);
      }
    );
  })
}
module.exports = {
  resetPassword,
  validateUserResetCode,
  getUser,
  newPassword
};
