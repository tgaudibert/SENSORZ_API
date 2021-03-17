var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const repository = require('../repository')





async function loadProfile(req, res, next) {

  let compte = {};
  const { iduser } = req.user
  //debug(req.body)

  try {
    user = await repository.getUser( iduser );
    debug(user)
    return res.status(200).send({success:"success",user:user});

  } catch (error) {
    debug(error)
    return next(error);

  }
}

module.exports = loadProfile;
