var cloud = require('../../../db/cloudinaryConfig');
const repository = require('../repository');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const fs = require('fs')
var {dataUri} = require('../../../db/multerConfig');

const constants = require('../constants');
const {
  UPDATE_PROFILEPIC_ERROR
  } = require('../constants');


async function updateProfilePicture(req, res, next) {

  //debug(req.body.file)
  debug(req.body.name)
  const { iduser } = req.user


  if(req.body.file) {
    try{
      const file = dataUri(req).content;
      cloud.uploadFile(file).then(async (result) => {
        debug(result)
        debug(result.url)
        await repository.updateProfilePicture( result.url, iduser)
        return res.status(200).send({success:"ok"})
      }).catch(error=>{
        debug(error)
        return next(error);
      })
    }catch(error){
      debug(error)
      return next(error);
    }
  }

  if(req.body.pic_url){
    await repository.updateProfilePicture( req.body.pic_url, iduser)
    return res.status(200).send({success:"ok"})
  }

  if(!req.body.file && ! req.body.pic_url){
    return res.status(400).send({error:UPDATE_PROFILEPIC_ERROR})
  }
}

module.exports = updateProfilePicture;
