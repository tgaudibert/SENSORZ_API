const bcrypt = require('bcrypt');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);


const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)




async function getUserForLoginData(username, password){
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        username,
        iduser,
        password,
        name
      FROM users
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
          debug("no user matching this COMBINAISON")
          resolve(null);
        }

        debug(result.rows[0])
        const isPasswordValid = await bcrypt.compare(password, result.rows[0].password);
        if (!isPasswordValid) {
          resolve(null);
        }

        delete result.rows[0].password
        resolve(result.rows[0]);
      }
    );
  })
}

module.exports = {
  getUserForLoginData,
};
