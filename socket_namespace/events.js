var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);




const publicMessage = (namespace) => ({ room, message, username }) => {
    namespace.in(room).emit('newMessage', {
        message,
        username
    });
}



const joinPrivateRoom = (socket, namespace) => ({ username, room, to }) => {
    console.log(`user ${username} wants to have a private chat with ${to}`);

    // Join the room
    socket.of('/').adapter.remoteJoin(socket.id, 'room1', (err) => {
      if (err) {
        console.log(err)
       }
      // success
    });
}



module.exports = {
    publicMessage
}
