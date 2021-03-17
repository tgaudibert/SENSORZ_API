const events = require('./events.js')
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);

const { addUser, getUser } = require('../auth/redisfile')

var Redis = require('ioredis');
const { redisConfig } = require('../auth/redisfile')
const client    = new Redis(redisConfig);

require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const { appNotification } = require('../user_Notifications/main')





// When connecting
const onConnection = (socket) => {

    socket.emit('AUTH_REQUIRED', {type:'SOCKET_REQUIRE_AUTH'})
    debug(socket.id)

    socket.on('action', async (action) => {

      debug(action)
      if(action.type === 'server/authenticate'){
        try {
          const token = action.token.replace('Bearer ', '')
          const user = await getUser(token)
          if(user){
            socket.join(action.username, () => { console.log("hleooo") });
          }
        } catch (error) {
            debug(error)
        }
      }

      if(action.type === 'server/logout'){
        socket.conn.close()
      }

    });


    //socket.on('joinPrivateRoom', events.joinPrivateRoom(socket, namespace));
    //socket.on('publicMessage', events.publicMessage(socket, namespace))

    // Disconnect
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} disconnected`);
    })

}

exports.createNameSpace = (io) => {
    namespace = io
        .of(process.env.SOCKET_NAMESPACE)
        .on('connection', onConnection)

    var notificationData = appNotification.getNotification().subscribe(data => {
      io.of('/server').adapter.allRooms((err, rooms) => {
        console.log(rooms); // an array containing all rooms (accross every node)
      });
      const {message, users, sensornode} = data
      const userArray = users.map(user => {return user.username})

      userArray.forEach(username=>{
        namespace.in(username).emit('DEVICE_NOTIFICATION', {type:message, sensornode:sensornode})
      })
    })

}
