const bcrypt = require('bcrypt');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);


const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)




async function createUser( username, verification_code){
  return new Promise((resolve,reject)=>{
    pool.query(`
      INSERT INTO users
        ( username,
          name,
          password,
          verification_code)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO
        UPDATE SET
          verification_code= $4
        WHERE users.username = $1
        AND users.password = 'preregistered'
        RETURNING iduser;
        `,
    [username, 'preregistered', 'preregistered',verification_code],
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

async function finalRegistration( data ){
  const hashedPass = await bcrypt.hash(data.password, 5);
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE
        users
      SET
        name = $1,
        profilepic_url = $2,
        password = $3,
        lang = $4
      WHERE username = $5
      AND verification_code = $6
      AND isemailverified = 1
      AND password = 'preregistered'
      RETURNING iduser
        `,
    [data.name, data.profilepic_url, hashedPass, data.lang, data.username, data.verification_code],
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


async function getNewlyUser(username){
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        username,
        iduser
      FROM
        users
      WHERE username = $1
      AND isreset = 0
      AND isemailverified = 1`,
    [username],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        if (!result.rows[0]) {
          resolve(null);
        }

        debug(result.rows[0])
        resolve(result.rows[0]);
      }
    );
  })
}



module.exports = {
  createUser,
  validateUserRegistrationCode,
  getNewlyUser,
  finalRegistration
};
