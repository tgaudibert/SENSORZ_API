const { wrap } = require('async-middleware');

const validateRegisterPayload = require('./register_commands/validateRegisterPayload');
const validateCheckEmailPayload = require('./register_commands/validateCheckEmailPayload');
const validateCodeValidationPayload = require('./register_commands/validateCodeValidationPayload');

const codeRegistration = require('./register_commands/codeRegistration');
const createAccount = require('./register_commands/createAccount');
const checkEmail = require('./register_commands/checkEmail');
const uploadProfilePicture = require('./register_commands/uploadProfilePicture')


var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const {memoryUploads} = require('../../db/multerConfig');


module.exports = router => {
  router.post('/register/check-email', wrap(validateCheckEmailPayload), wrap(checkEmail));
  router.post('/register/validate', wrap(validateCodeValidationPayload), wrap(codeRegistration));
  //router.post('/register/profile_pic/upload', memoryUploads ,  wrap(uploadProfilePicture));
  router.post('/register/finalize',wrap(validateRegisterPayload),  wrap(createAccount));
  return router;
};
