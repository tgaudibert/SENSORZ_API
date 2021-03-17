require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
var Redis = require('ioredis');


//CHECK THE ENV AND ADD PWD OR NOT TO redisSession
//-------------------------------

let redisConfig = {
  port      : process.env.REDIS_PORT,               // replace with your port
  host      : process.env.REDIS_HOST,        // replace with your hostanme or IP address
  password  : process.env.REDIS_PASSWORD,
}

if(process.env.NODE_ENV == 'GITLABCI'){
  redisConfig = {
    port      : process.env.REDIS_PORT,               // replace with your port
    host      : process.env.REDIS_HOST        // replace with your hostanme or IP addres
  }
}

const client    = new Redis(redisConfig);


  function setUser(userKey, data){
    return new Promise((resolve,reject)=>{
      client.set(userKey, data, function(err) {
        if (err) {
          debug(err)
          reject(err)
        }
        resolve('ok')
      });
    })
  }

  function setSocket(socketKey, data){
    return new Promise((resolve,reject)=>{
      client.set(socketKey, data, function(err) {
        if (err) {
          debug(err)
          reject(err)
        }
        resolve('ok')
      });
    })
  }


function getUser(key){
  return new Promise((resolve,reject)=>{
    client.get(key, function(err,value) {
      if (err) {
        debug(err)
        reject(err)
      }
      debug(value)
      resolve(value)
    })
  })
}



function delUser(key){
  return new Promise((resolve,reject)=>{
    client.del(key, function(err, response) {
      if (err) {
        debug(err)
        reject(err)
      }
      resolve(response)
   })
 })
}


module.exports = {
  setUser,
  setSocket,
  getUser,
  delUser,
  redisConfig
}
