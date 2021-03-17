const Joi = require('joi');
var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const constants = require('../constants');


const { INVALID_REGISTERUSERNAME_PAYLOAD } = require('../constants');



const schema = Joi.object().keys({
  username: Joi.string().required().email({ minDomainAtoms: 2 }),
});


async function validateCheckEmailPayload(req, res, next) {
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
        path: [key],
        type,
      } = errorDetail;
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`];
    });
  }

  if (errors) {
    debug(errors)
    return res.status(400).send({ error:INVALID_REGISTERUSERNAME_PAYLOAD});
  }
  return next();
}

module.exports = validateCheckEmailPayload;
