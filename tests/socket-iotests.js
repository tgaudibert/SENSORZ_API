const io = require('socket.io-client');

const socket = io('https://ydeo-monitor.com/server');


socket.on('connect', function(){
  console.log('connected')
});

socket.on('event', function(data){
  console.log(data)
});

socket.on('disconnect', function(){
  console.log('disconnected')
});
