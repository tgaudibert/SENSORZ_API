const { wrap } = require('async-middleware');

const validateLoginPayload = require('./login_commands/validateLoginPayload');
const login = require('./login_commands/login');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);



module.exports = router => {
  router.post('/auth/login', wrap(validateLoginPayload), wrap(login));
  return router;
};
