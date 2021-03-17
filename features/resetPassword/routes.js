const { wrap } = require('async-middleware');


const validateResetPasswordPayload = require('./resetPassword_commands/validateResetPasswordPayload');
const validateNewPasswordPayload = require('./resetPassword_commands/validateNewPasswordPayload');
const validateCodeValidationPayload = require('./resetPassword_commands/validateCodeValidationPayload');

const codeResetPassword = require('./resetPassword_commands/codeResetPassword');
const newPassword = require('./resetPassword_commands/newPassword');
const resetPassword = require('./resetPassword_commands/resetPassword');



module.exports = router => {
  router.post('/resetpassword/request', wrap(validateResetPasswordPayload), wrap(resetPassword));
  router.post('/resetpassword/validate', wrap(validateCodeValidationPayload), wrap(codeResetPassword));
  router.post('/resetpassword/new', wrap(validateNewPasswordPayload), wrap(newPassword));
  return router;
};
