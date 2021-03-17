var cloud = require('../../../db/cloudinaryConfig');
const repository = require('../repository');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const fs = require('fs')
var {dataUri} = require('../../../db/multerConfig');

const {
  INTERNAL_ERROR,
  NO_PICTURE_PROVIDED
  } = require('../constants');


async function uploadProfilePicture(req, res, next) {

  debug(req.file)

  if(req.file) {
    const file = dataUri(req).content;
    cloud.uploadFile(file).then(async (result) => {
      debug(result)
      debug(result.url)
      return res.status(200).send({success:"ok",profilepic_url:result.url})
    }).catch(error=>{
      debug(error)
      return next(error);
    })
  }

  if(!req.file){
    return res.status(400).send({error:NO_PICTURE_PROVIDED})
  }
}

module.exports = uploadProfilePicture;
