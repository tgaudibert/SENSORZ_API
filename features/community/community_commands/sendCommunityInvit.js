require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const repository = require('../repository');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);

const {sendInvitationMail} = require('../../../user_Emailing/main')

const {
  SEND_COMMUNITY_INVIT_ERROR,
  INTERNAL_ERROR
  } = require('../constants');




async function sendCommunityInvit(req, res, next) {

  const { iduser } = req.user
  const { action_type, email, id_masternode} = req.body
  const verification_code = process.env.VERIFICATION_CODE || Math.floor(100000 + Math.random() * 900000).toString()
  let data;

  try{
    data = await repository.createInvitationCode( email, id_masternode, verification_code, iduser )
    if(data.rowCount != 0){
      sendInvitationMail(email, verification_code)
      return res.status(200).send({success:"ok"})
    }
    return res.status(400).send({error:SEND_COMMUNITY_INVIT_ERROR});

  }catch(error){
    return next(error);
  }
}

module.exports = sendCommunityInvit;
