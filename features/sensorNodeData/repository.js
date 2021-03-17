const Pool = require('pg').Pool
const config = require('../../db/postgresfile')
const pool = new Pool(config)

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);



async function insertSensorData( data , id_masternode ){
  return new Promise((resolve,reject)=>{
    pool.query(`
      INSERT INTO sensordatanodes
      ( snr,
        rssi,
        data_sensor,
        battery_porcent,
        wakeup_numb,
        filling_porcent,
        id_sensornode )
      VALUES ($1, $2, $3, $4, $5, $6, (SELECT id_sensornode FROM sensornodes WHERE id_device = $7 AND id_masternode = $8))`,
    [data.snr, data.rssi, data.data_sensor, data.battery_porcent, data.wakeup_numb, data.filling_porcent, data.id_device , id_masternode ],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }

        resolve();
      }
    );
  })
}


async function createSensorNode( id_device, id_masternode ) {
  return new Promise((resolve,reject)=>{
    pool.query('INSERT INTO sensornodes ( id_device, id_masternode, capacity) VALUES ($1, $2, $3)',
    [id_device, id_masternode, 1000],
      async function (error, result,  fields) {
        if(error){
          debug(error)
          reject(error)
        }
        resolve();
      }
    );
  })
}


async function activateMasterNode( id_masternode ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      UPDATE masternodes
      SET isactive = 1
      WHERE id_masternode = $1 `,
    [id_masternode],
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

async function getMasternodeUsers( id_masternode ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT username, lang
      FROM users
      INNER JOIN linkmasternodes ON linkmasternodes.iduser = users.iduser
      INNER JOIN masternodes ON masternodes.id_masternode = linkmasternodes.id_masternode
      WHERE masternodes.id_masternode = $1 `,
    [id_masternode],
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


async function getSensorNode(id_device, id_masternode ) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      SELECT
        sensornode_name,
        sensornode_product
      FROM sensornodes
      INNER JOIN masternodes ON masternodes.id_masternode = sensornodes.id_masternode
      WHERE id_device = $1
      AND sensornodes.id_masternode = $2
      `,
    [id_device, id_masternode],
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



async function createNotification( notification_type, id_device ,id_masternode) {
  return new Promise((resolve,reject)=>{
    pool.query(`
      INSERT INTO sensorsnotification
      (id_sensornotification_type, id_sensornode)
      SELECT
        (SELECT id_sensornotification_type FROM sensorsnotification_type WHERE notification_type = $1),
        (SELECT id_sensornode FROM sensornodes WHERE id_device = $2)

      WHERE NOT EXISTS (
        SELECT sensorsnotification.id_sensornotification FROM sensorsnotification
        INNER JOIN sensornodes ON sensorsnotification.id_sensornode = sensornodes.id_sensornode
        INNER JOIN masternodes ON masternodes.id_masternode = sensornodes.id_masternode
        WHERE notified_at <  date_trunc('day'  , now()) + interval '1 day'
        AND id_sensornotification_type = (SELECT id_sensornotification_type FROM sensorsnotification_type WHERE notification_type = $1)
        AND id_device = $2
        AND masternodes.id_masternode = $3
    );`,
    [notification_type, id_device, id_masternode],
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
  insertSensorData,
  createSensorNode,
  activateMasterNode,
  getMasternodeUsers,
  getSensorNode,
  createNotification
}
