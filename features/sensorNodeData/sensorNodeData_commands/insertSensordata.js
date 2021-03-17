var path = __filename.replace(global.__basedir,'');
var debug = require('debug')('express:'+path);
const {getSensorNode, getMasternodeUsers ,createNotification, insertSensorData, createSensorNode} = require('../repository')
const {appNotification} = require('../../../user_Notifications/main')


const {
  INTERNAL_ERROR,
  FETCH_INFO_ERROR_MESSAGE,
  NEW_PENDING_SENSOR,
  LOW_BATTERY,
  WEAK_SIGNAL,
  LOW_LEVEL
  } = require('../constants');

const MIN_SIGNAL = -40
const MIN_BATTERY = 25
const MIN_FILLING = 34



async function checkNotificationNeed(receivedData , id_masternode){

  let sensornode, users;
  const {
    id_device,
    rssi,
    battery_porcent,
    filling_porcent
  } = receivedData

  if(rssi < MIN_SIGNAL || battery_porcent < MIN_BATTERY || filling_porcent < MIN_FILLING){
    const sensornode = await  getSensorNode(id_device, id_masternode )
    const users = await getMasternodeUsers( id_masternode )

    if(rssi < MIN_SIGNAL){
      debug("WEAK SIGNAL")
      const result = await createNotification(WEAK_SIGNAL,id_device, id_masternode)
      if(result.rowCount == 1){
        appNotification.sendNotification({message:WEAK_SIGNAL, sensornode:sensornode, users:users})
      }
    }

    if(battery_porcent < MIN_BATTERY){
      debug("LOW BATTERY")
      const result = await createNotification(LOW_BATTERY,id_device, id_masternode)
      if(result.rowCount == 1){
        appNotification.sendNotification({message:LOW_BATTERY, sensornode:sensornode, users:users})
      }
    }

    if(filling_porcent < MIN_FILLING){
      debug("LOW LEVELL")
      const result = await createNotification(LOW_LEVEL,id_device, id_masternode)
      if(result.rowCount == 1){
        appNotification.sendNotification({message:LOW_LEVEL, sensornode:sensornode, users:users})
      }
    }

  }

}





async function insertSensordata(req, res, next) {

  const {data,snr,rssi} = req.body
  const { id_masternode } = req.masternode
  debug(req.body)
  let insertingData;

  try {
    const dataArr = data.split(':')
    debug(dataArr)
    insertingData = {
      rssi:rssi,
      snr:snr,
      id_device: dataArr[1],
      data_sensor: JSON.stringify({sensor1:dataArr[2],sensor2:dataArr[3]}),
      wakeup_numb:dataArr[4],
      battery_porcent: dataArr[5],
      filling_porcent:dataArr[6]
    }
    await insertSensorData(insertingData ,id_masternode)
    checkNotificationNeed(insertingData ,id_masternode)
    debug(insertingData)
    return res.status(200).send({success:"ok"})

  }catch(error){
    debug(error)
    if(error.code && error.code == 23502){
      debug('duplicate key')

      createSensorNode(insertingData.id_device, id_masternode).then(async data=>{
        await insertSensorData(insertingData ,id_masternode)
        const users = await getMasternodeUsers( id_masternode )
        appNotification.sendNotification({message:NEW_PENDING_SENSOR, users:users})
        return res.status(201).send({success:"device created"})

      }).catch(error=>{
        return res.status(403).send({error:"device already created"})
      })

    }else{
      return res.status(400).send({error: 'BAD_REQUEST' })

    }
  }
}

module.exports = insertSensordata;
