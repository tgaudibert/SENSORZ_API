const PushNotifications = require('@pusher/push-notifications-server');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const { v4: uuidv4 } = require('uuid');


const beamsConf = require('../../../user_Notifications/config/beams')
let beamsClient = new PushNotifications(beamsConf);


const { getUserForLoginData } = require('../repository')
const { setUser } = require('../../../auth/redisfile')

const {
  INVALID_CREDENTIALS,
  SUCCESSFULLY_LOGGED_IN,
  INTERNAL_ERROR
} = require('../constants');



async function login(req, res, next) {

  const {  username, password } = req.body
  debug(req.body)

  var token = ""
  const user = await getUserForLoginData(username, password);
  debug(user)


  if (!user) {
    return res.status(400).send({ error: INVALID_CREDENTIALS});
  }

  try{
    token = uuidv4()
    await setUser(token, JSON.stringify(user))
    const beamsToken = beamsClient.generateToken(user.username);
    debug(beamsToken)
    //const channelsAuth = pusher.authenticate(socket_id, channel_name, user);
    return res.status(200).json({ token, user,beamsToken, success:SUCCESSFULLY_LOGGED_IN});

  }catch(error){
    debug(error)
    return next(error);
  }

}

module.exports = login;
