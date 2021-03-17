const Joi = require('joi');
const constants = require('../constants');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);

const {
  INVALID_INVITATION_CODE
  } = require('../constants');

const schema = Joi.object().keys({
  username: Joi.string().email({ minDomainAtoms: 2 }),
  verification_code:Joi.string()
    .required()
    .min(2)
    .max(70)
});

async function validateAcceptCommunityPayload(req, res, next) {
  debug(req.body)
  let payloadValidation;
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
        message,
        path: [key],
        type,
      } = errorDetail;
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`] || message;
    });
  }

  if (errors) {
    debug(errors)
    req.messages = { errors };
    return res.status(400).send({error:INVALID_INVITATION_CODE});
  }
  return next();
}

module.exports = validateAcceptCommunityPayload;
