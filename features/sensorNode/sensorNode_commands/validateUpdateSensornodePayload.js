const Joi = require('joi');
const constants = require('../constants');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);



const {
  SENSORNODE_NAME_MIN,
  SENSORNODE_NAME_MAX,
  SENSORNODE_PRODUCT_MIN,
  SENSORNODE_PRODUCT_MAX,
  ERROR_UPDATE_SENSORNODE_PAYLOAD
  } = constants;

const schema = Joi.object().keys({
  sensornode_name:Joi.string()
    .required()
    .min(SENSORNODE_NAME_MIN)
    .max(SENSORNODE_NAME_MAX),
  sensornode_product:Joi.string()
    .required()
    .min(SENSORNODE_PRODUCT_MIN)
    .max(SENSORNODE_PRODUCT_MAX),
  isactive:Joi.number().integer().required(),
  id_sensornode:Joi.number().integer().required(),
});


async function validateUpdateSensornodePayload(req, res, next) {
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
    return res.status(400).send({ error:ERROR_UPDATE_SENSORNODE_PAYLOAD});
  }
  return next();
}

module.exports = validateUpdateSensornodePayload;
