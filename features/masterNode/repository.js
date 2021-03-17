const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);





async function getMasterNodeBYID( id_masternode, iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
    SELECT
      masternodes.id_masternode,
      masternode_name,
      users.iduser,
      syncword,
      name_linkauthorization,
      isowner
    FROM masternodes
    INNER JOIN linkmasternodes
    ON linkmasternodes.id_masternode = masternodes.id_masternode
    INNER JOIN linkauthorization
    ON linkmasternodes.id_linkauthorization = linkauthorization.id_linkauthorization
    INNER JOIN users
    ON linkmasternodes.iduser = users.iduser
    WHERE masternodes.id_masternode = $1
    AND users.iduser = $2`,
    [id_masternode, iduser],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }
        //debug(result.rows[0])
        resolve(result.rows[0]);

        }
    );
  })
}

async function getMasterNodes( iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        masternodes.id_masternode,
        masternode_name,
        isactive,
        syncword,
        name_linkauthorization,
        isowner
      FROM masternodes
      INNER JOIN linkmasternodes
      ON linkmasternodes.id_masternode = masternodes.id_masternode
      INNER JOIN linkauthorization
      ON linkmasternodes.id_linkauthorization = linkauthorization.id_linkauthorization
      INNER JOIN users
      ON linkmasternodes.iduser = users.iduser
      WHERE users.iduser = $1
      ORDER BY linkmasternodes.link_created_at
      DESC LIMIT 1`,
    [iduser],
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



async function createMasterNode( masternode_name, iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      WITH new_masternode AS (
        INSERT INTO masternodes
          ( masternode_name,
            syncword )
        SELECT $1, $3
        WHERE NOT EXISTS (SELECT id_masternode FROM linkmasternodes WHERE iduser = $2)
        RETURNING id_masternode
      )
      INSERT INTO linkmasternodes
        ( id_masternode,
          iduser,
          id_linkauthorization,
          isowner)
      VALUES (
        (SELECT id_masternode FROM new_masternode),
         $2,
         (SELECT id_linkauthorization FROM linkauthorization WHERE name_linkauthorization = 'ADMIN') ,
         1)`,
    [masternode_name, iduser, Math.floor(Math.random()*254 + 1)],
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




async function updateMasterNode( data, id_masternode, iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE
        masternodes
      SET
        masternode_name = $3,
        isactive = $4
        INNER JOIN
        ON linkmasternodes.id_masternode = masternodes.id_masternode
        INNER JOIN linkauthorization
        ON linkmasternodes.id_linkauthorization = linkauthorization.id_linkauthorization
        INNER JOIN users
        ON linkmasternodes.iduser = users.iduser
        WHERE masternodes.id_masternode = $1
        AND users.iduser = $2`,
    [id_masternode, iduser, data.masternode_name, data.isactive],
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
  getMasterNodes,
  getMasterNodeBYID,
  createMasterNode,
  updateMasterNode
};
