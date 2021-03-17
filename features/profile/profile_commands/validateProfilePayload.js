const Joi = require('joi');
const constants = require('../constants');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);



const { NAME_MIN, NAME_MAX, UPDATE_PROFILE_ERROR } = constants;

const schema = Joi.object().keys({
  name:Joi.string()
    .required()
    .min(NAME_MIN)
    .max(NAME_MAX)
});


async function validateProfilePayload(req, res, next) {

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
        path: [key],
        type,
      } = errorDetail;
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`];
    });
  }

  if (errors) {
    debug(errors)
    req.messages = { errors };
    return res.status(400).send({error:UPDATE_PROFILE_ERROR});
  }
  return next();
}

module.exports = validateProfilePayload;
