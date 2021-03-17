const debug = require('debug')('express:authChecking');
var path = __filename.replace(global.__basedir,'');

const fs = require('fs')
var publicKEY  = fs.readFileSync('./keys/jwtRS256.key.pub', 'utf8');

const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authOptions = require('../auth/authfile')

const { getUser } = require('../auth/redisfile')

const mountResetPasswordRoutes = require('../features/resetPassword/routes');
const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountProfileRoutes = require('../features/profile/routes');
const mountSensorDataRoutes = require('../features/sensorNodeData/routes');
const mountSensorNodeRoutes = require('../features/sensorNode/routes');
const mountMasterNodesRoutes = require('../features/masterNode/routes');
const mountCommunityRoutes= require('../features/community/routes')




const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    debug("CHECKING TOKEN")
    const user = await getUser(token)
    var legit = JSON.parse(user)
    if(legit){
      req.user = legit
      next()
    }else{
      debug("error")
      res.status(401).send({ error: 'UNAUTHORIZED' })
    }
  } catch (error) {
      debug(error)
      res.status(401).send({ error: 'UNAUTHORIZED' })
  }
}


const sensorAuth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    var legit = jwt.verify(token, publicKEY, authOptions);
    if(legit){
      req.masternode = legit.masternode
      next()
    }else{
      debug("error")
      res.status(401).send({ error: 'UNAUTHORIZED' })
    }
  } catch (error) {
      debug(error)
      res.status(401).send({ error: 'UNAUTHORIZED' })
  }
}


mountResetPasswordRoutes(router);
mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router, [auth]);
mountCommunityRoutes(router, [auth]);
mountProfileRoutes(router, [auth]);
mountSensorDataRoutes(router, [sensorAuth]);
mountSensorNodeRoutes(router, [auth]);
mountMasterNodesRoutes(router, [auth]);


module.exports = router;
