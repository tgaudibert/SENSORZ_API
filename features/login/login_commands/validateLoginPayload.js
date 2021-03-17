const Joi = require('joi');
const constants = require('../constants');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);





const { PASSWORD_MAX, PASSWORD_MIN, INVALID_CREDENTIALS } = constants;

const schema = Joi.object().keys({
  username: Joi.string()
    .required()
    .email({ minDomainAtoms: 2 }),
  password: Joi.string()
    .required()
    .min(PASSWORD_MIN)
    .max(PASSWORD_MAX),

});

module.exports = async function validateLoginPayload(req, res, next) {
  debug(req.body)
  let payloadValidation = {};
  try {
    payloadValidation = await Joi.validate(req.body, schema, { abortEarly: false });
  } catch (validateRegisterError) {
    payloadValidation = validateRegisterError;
  }
  const { details } = payloadValidation;
  let errors;

  if (details) {
    errors = {};
    details.forEach(errorDetail => {
      const {
        path: [key],
        type,
      } = errorDetail;
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`];
    });
  }

  if (errors) {
    debug(errors)
    return res.status(400).send({error:INVALID_CREDENTIALS});
  }
  return next();
};
