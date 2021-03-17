const { wrap } = require('async-middleware');


const validateCodeValidationPayload = require('./codeValidation_commands/validateCodeValidationPayload');
const codeRegistration = require('./codeValidation_commands/codeRegistration');
const codeResetPassword = require('./codeValidation_commands/codeResetPassword');



module.exports = router => {
  router.post('/auth/registration-validation', wrap(validateCodeValidationPayload), wrap(codeRegistration));
  router.post('/auth/reset-validation', wrap(validateCodeValidationPayload), wrap(codeResetPassword));
  return router;
};
