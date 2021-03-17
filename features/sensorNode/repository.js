const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);





async function getSensorNodes(  iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`SELECT
                	DISTINCT ON (sensornodes.id_sensornode) sensordatanodes.id_sensornode,
                	sensordatanodes.id_sensordatanode,
                	sensornodes.isactive,
                	id_sensordatanode,
                	iswaiting,
                	capacity,
                	sensornode_product,
                	id_device,
                	sensornode_name,
                	sensornodes.created_at,
                	added_at,
                	wakeup_numb,
                	battery_porcent,
                	filling_porcent,
                  snr,
                  rssi
                FROM sensornodes
                INNER JOIN sensordatanodes ON sensordatanodes.id_sensornode =sensornodes.id_sensornode
                INNER JOIN masternodes ON sensornodes.id_masternode = masternodes.id_masternode
                INNER JOIN linkmasternodes ON linkmasternodes.id_masternode = masternodes.id_masternode
                INNER JOIN users ON linkmasternodes.iduser = users.iduser
                WHERE users.iduser = $1
                AND iswaiting = 0
                ORDER BY sensornodes.id_sensornode,sensordatanodes.id_sensordatanode DESC`,
    [iduser],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        //debug(result.rows)
        resolve(result.rows);
      }
    );
  })
}



async function getWaitingSensorNodes( iduser ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        sensornodes.id_sensornode,
        sensornodes.isactive,
        sensornode_product,
        id_device,
        sensornode_name,
        sensornodes.created_at,
        iswaiting
      FROM sensornodes
      INNER JOIN masternodes ON masternodes.id_masternode = sensornodes.id_masternode
      INNER JOIN linkmasternodes ON linkmasternodes.id_masternode = masternodes.id_masternode
      INNER JOIN users ON linkmasternodes.iduser = users.iduser
      WHERE users.iduser = $1
      AND iswaiting = 1`,
    [iduser],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }
        //debug(result.rows)
        resolve(result.rows);
      }
    );
  })
}



async function updateSensorNode( data, iduser ) {
  debug(data)
  debug(iduser)
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE
        sensornodes
      SET
        sensornode_name = $1,
        isactive = $2,
        iswaiting = 0,
        sensornode_product = $3
      FROM masternodes,users,linkmasternodes
      WHERE masternodes.id_masternode = sensornodes.id_masternode
      AND linkmasternodes.id_masternode = masternodes.id_masternode
      AND linkmasternodes.iduser = users.iduser
      AND id_sensornode = $4
      AND users.iduser = $5`,
    [data.sensornode_name, data.isactive, data.sensornode_product, data.id_sensornode, iduser],
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



async function deleteSensorDataNode( id_sensornode , iduser){
  return new Promise((resolve,reject)=>{
    pool.query(`
      DELETE
      FROM sensordatanodes
      USING sensornodes, masternodes, users, linkmasternodes, linkauthorization
      WHERE sensornodes.id_sensornode = sensordatanodes.id_sensornode
      AND masternodes.id_masternode = sensornodes.id_masternode
      AND linkmasternodes.id_masternode = masternodes.id_masternode
      AND linkmasternodes.id_linkauthorization = linkauthorization.id_linkauthorization
      AND linkmasternodes.iduser = users.iduser
      AND sensornodes.id_sensornode = $1
      AND users.iduser = $2
      AND name_linkauthorization = 'ADMIN'`,
    [id_sensornode, iduser],
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


async function deleteSensorNotifications( id_sensornode , iduser){
  return new Promise((resolve,reject)=>{
    pool.query(`
      DELETE
      FROM sensorsnotification
      USING sensornodes, masternodes, users, linkmasternodes, linkauthorization
      WHERE sensornodes.id_sensornode = sensorsnotification.id_sensornode
      AND masternodes.id_masternode = sensornodes.id_masternode
      AND linkmasternodes.id_masternode = masternodes.id_masternode
      AND linkmasternodes.id_linkauthorization = linkauthorization.id_linkauthorization
      AND linkmasternodes.iduser = users.iduser
      AND sensornodes.id_sensornode = $1
      AND users.iduser = $2
      AND name_linkauthorization = 'ADMIN'`,
    [id_sensornode, iduser],
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

async function deleteSensorNode( id_sensornode , iduser) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      DELETE
      FROM sensornodes
      USING masternodes,users,linkmasternodes,linkauthorization
      WHERE masternodes.id_masternode = sensornodes.id_masternode
      AND linkmasternodes.id_masternode = masternodes.id_masternode
      AND linkmasternodes.id_linkauthorization = linkauthorization.id_linkauthorization
      AND linkmasternodes.iduser = users.iduser
      AND id_sensornode = $1
      AND users.iduser = $2
      AND name_linkauthorization = 'ADMIN'`,
    [id_sensornode, iduser],
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
  getSensorNodes,
  getWaitingSensorNodes,
  updateSensorNode,
  deleteSensorDataNode,
  deleteSensorNode,
  deleteSensorNotifications
}
