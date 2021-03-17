const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)
const bcrypt = require('bcrypt')
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);





async function getCommunity( iduser, id_masternode ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        username,
        name,
        users.iduser,
        profilepic_url,
        isrequesting,
        isowner
      FROM users
      INNER JOIN linkmasternodes ON linkmasternodes.iduser = users.iduser
      WHERE id_masternode = (SELECT id_masternode FROM linkmasternodes WHERE iduser = $1 AND id_masternode = $2)`,
    [iduser, id_masternode],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        debug(result.rows)
        resolve(result.rows);

      }
    );
  })
}


async function excludeLinkUserCommunity( username, id_masternode, iduser ) {
  debug(iduser)
  return new Promise((resolve,reject)=>{
    pool.query(`
      DELETE FROM linkmasternodes
      WHERE iduser = (SELECT iduser FROM users WHERE username = $1) AND NOT iduser = $3
      AND id_masternode = (
        SELECT id_masternode FROM linkmasternodes
        INNER JOIN linkauthorization ON linkmasternodes.id_linkauthorization = linkmasternodes.id_linkauthorization
        WHERE id_masternode = $2
        AND iduser = $3
        AND name_linkauthorization = 'ADMIN'
      )
      `,
    [  username, id_masternode, iduser],
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


async function deleteCommunity( iduser, id_masternode ) {
  debug(iduser)
  return new Promise((resolve,reject)=>{
    pool.query(`
      DELETE FROM linkmasternodes
      WHERE iduser = $1
      AND isowner = 1
      AND id_masternode = $2
      AND NOT EXISTS (
        SELECT username FROM users
        INNER JOIN linkmasternodes ON linkmasternodes.iduser = users.iduser
        WHERE id_masternode = $2 AND isowner=0
      )
      AND NOT EXISTS (
        SELECT id_sensornode FROM sensornodes
        INNER JOIN masternodes ON masternodes.id_masternode = sensornodes.id_masternode
        WHERE masternodes.id_masternode = $2
      )
      `,
    [ iduser, id_masternode],
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



async function deleteLinkUserCommunity( iduser, id_masternode ) {
  debug(iduser)
  return new Promise((resolve,reject)=>{
    pool.query(`
      DELETE FROM linkmasternodes
      WHERE iduser = $1
      AND isowner = 0
      AND id_masternode = $2`,
    [ iduser, id_masternode],
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



async function validateInvitationCode( verification_code , iduser) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      INSERT INTO linkmasternodes
        ( id_masternode,
          iduser,
          id_linkauthorization )
      SELECT
        ( SELECT id_masternode FROM masternodeinvitation WHERE verification_code = $1
          AND email = (SELECT username FROM users WHERE iduser = $2)
          AND invited_at <  date_trunc('day'  , now()) + interval '1 day'
          ORDER BY invited_at DESC LIMIT 1) , $2, 2

      WHERE EXISTS (
        SELECT id_masternode
        FROM masternodeinvitation
        WHERE verification_code = $1
        AND email = (SELECT username FROM users WHERE iduser = $2)
        AND invited_at <  date_trunc('day'  , now()) + interval '1 day'
        ORDER BY invited_at DESC LIMIT 1
      )
      AND NOT EXISTS (
        SELECT id_masternode FROM linkmasternodes
        WHERE iduser = $2
      )
    `,
    [verification_code , iduser],
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


async function createInvitationCode( email, id_masternode, verification_code, iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      INSERT INTO masternodeinvitation
      (email, id_masternode, verification_code)
      SELECT $1,$2,$3
      WHERE EXISTS ( SELECT id_masternode FROM linkmasternodes WHERE id_masternode = $2 AND iduser = $4 );
    `,
    [email, id_masternode, verification_code, iduser],
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
  getCommunity,
  deleteLinkUserCommunity,
  deleteCommunity,
  createInvitationCode,
  validateInvitationCode,
  excludeLinkUserCommunity
};
