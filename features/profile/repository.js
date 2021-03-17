const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)
const bcrypt = require('bcrypt')
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);





async function getUser( iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        username,
        name,
        iduser,
        profilepic_url
      FROM users
      WHERE iduser = $1`,
    [iduser],
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


async function updateProfile( data, iduser ) {
  debug(data)
  debug(iduser)
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE users
      SET name = $1
      WHERE iduser = $2`,
    [data.name, iduser],
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


async function updateProfilePicture( profilepic_url, iduser ) {
  debug(iduser)
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE users
      SET profilepic_url = $1
      WHERE iduser = $2`,
    [profilepic_url, iduser],
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


module.exports = {
  getUser,
  updateProfile,
  updateProfilePicture,
  resetPassword
};
