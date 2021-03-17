var path = __filename.replace(global.__basedir,'');
var debug = require('debug')('express:'+path);
const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');
const { getMasterNodeBYID } = require('../repository')
const fs = require('fs')
const jwt = require('jsonwebtoken');
var privateKEY  = fs.readFileSync('./keys/jwtRS256.key', 'utf8');
const authOptions = require('../../../auth/authfile')


async function generateMasterKey(req, res, next) {

  const { iduser } = req.user
  const { id_masternode } = req.params
  var token = ""

  const masternode = await  getMasterNodeBYID( id_masternode, iduser );
  if (!masternode) {

    return res.status(400).send({error:'GENERATE_MASTERKEY_ERROR'});
  }

  try{
    token = jwt.sign({masternode:masternode}, privateKEY, authOptions);
    return res.status(200).send({ token, success:'KEY GENERATED'});

  }catch(error){
    debug(error)
    return next(error);
  }
}

module.exports = generateMasterKey;
