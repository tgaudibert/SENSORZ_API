const PushNotifications = require('@pusher/push-notifications-server');
const beamsConf = require('./config/beams')
let beamsClient = new PushNotifications(beamsConf);
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const {notificationTranslate} = require('./translations/local')
const { getUser } = require('../auth/redisfile')

var Redis = require('ioredis');

const { redisConfig } = require('../auth/redisfile')
const client    = new Redis(redisConfig);


const {
  INTERNAL_ERROR,
  FETCH_INFO_ERROR_MESSAGE,
  NEW_PENDING_SENSOR,
  LOW_BATTERY,
  WEAK_SIGNAL,
  LOW_LEVEL
  } = require('./constants');


//EVENT HANDLER/DISPATCHER
const { Subject } = require('rxjs');
const subject = new Subject();

const appNotification = {
    sendNotification: data => subject.next(data),
    getNotification: () => subject.asObservable()
};



//SUBSCRIBE TO EVETN HANDLER
var notificationData = appNotification.getNotification().subscribe(data => {
  debug(data)
  const {message, users, sensornode} = data
  const userArray = users.map(user => {return user.username})
  let notification;

  if(userArray.length > 0) {
    switch (message) {
      case WEAK_SIGNAL:
        notification = {
          title: sensornode.sensornode_name,
          body: notificationTranslate(users[0].lang, message)
        }
        pushNotification(userArray,notification)
        break

      case LOW_LEVEL:
        notification =  {
          title: sensornode.sensornode_name,
          body: notificationTranslate(users[0].lang, message)
        }
        pushNotification(userArray,notification)
        break

      case LOW_BATTERY:
        notification = {
          title:sensornode.sensornode_name,
          body: notificationTranslate(users[0].lang, message)
        }
        pushNotification(userArray,notification)
        break

      default:
        notification =  {
          title: notificationTranslate(users[0].lang, message),
          body: ''
        }
        pushNotification(userArray,notification)
        break
    }
  }
})




function pushNotification(users, notification){


  //EXTERNAL NOTIFICATION
  beamsClient.publishToUsers(users, {
    apns: {
      aps: {
        alert: notification.title + notification.body
      }
    },
    fcm: {
      notification: notification
    }
  }).then((publishResponse) => {
    console.log('Just published:', publishResponse.publishId);
  }).catch((error) => {
    console.error('Error:', error);
  });


}




module.exports = {
  appNotification
}
