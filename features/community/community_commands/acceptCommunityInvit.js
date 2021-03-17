var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const { validateInvitationCode} = require('../repository')


const {
  INTERNAL_ERROR,
  INVALID_INVITATION_CODE
  } = require('../constants');



async function acceptCommunityInvit(req, res, next) {

  const { iduser } = req.user
  let result;
  const {
    username,
    verification_code
  } = req.body

  try {
    result = await validateInvitationCode( verification_code, iduser);
    if(result.rowCount !=0){
      return res.status(200).send({ success : "ok"});
    }
    return res.status(400).send({ error: INVALID_INVITATION_CODE });

  } catch (error) {
    debug(error)
    return next(error);
  }


}

module.exports = acceptCommunityInvit;
