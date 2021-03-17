const PushNotifications = require('@pusher/push-notifications-server');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const { finalRegistration, getNewlyUser } = require('../repository')

const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../../../auth/redisfile')

const {sendRegisterMail} = require('../../../user_Emailing/main')
const beamsConf = require('../../../user_Notifications/config/beams')
let beamsClient = new PushNotifications(beamsConf);

const {
  INTERNAL_ERROR,
  REGISTER_SUCCESS,
  REGISTRATION_ERROR
  } = require('../constants');



async function createAccount(req, res, next) {

  let token = ''
  debug(req.body)
  let result;

  try {
    result = await finalRegistration( req.body );
    if(result.rowCount != 0) {
      const user = await getNewlyUser ( req.body.username )
      token = uuidv4()
      await setUser(token, JSON.stringify(user))

      const beamsToken = beamsClient.generateToken(user.username);
      return res.status(200).send({ token, user,beamsToken, success:REGISTER_SUCCESS});

    }else{
      return res.status(400).send({ error: REGISTRATION_ERROR });
    }

  } catch (error) {
    debug(error)
    return next(error);

  }
}

module.exports = createAccount;
