const { delUser } = require('../../../auth/redisfile')


async function logout(req, res,next) {
  console.log("logout")

  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const response = await delUser(token)
    if(response){
      console.log('LOGOUT SUCCESS')
      return res.status(200).send({success:'ok'});
    }
    return res.status(403).send({error:'LOGOUT_ERROR'});

  }catch(error){
    return next(error)
  }
}

module.exports = {
  logout,
};
