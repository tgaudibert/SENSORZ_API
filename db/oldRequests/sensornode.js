
async function createSensorNode( data , iduser) {
  return new Promise((resolve,reject)=>{
    pool.query(`INSERT
      INTO sensornodes
       (id_device,
        sensornode_name,
        sensornode_product,
        id_masternode)
      VALUES
        ($1, $2, $3, (SELECT id_masternode FROM masternodes WHERE id_masternode = $4 AND iduser = $5)) `,
    [data.id_device, data.sensornode_name, data.sensornode_product, data.id_masternode, iduser],
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
