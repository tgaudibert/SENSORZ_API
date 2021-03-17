const Joi = require('joi');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const constants = require('../constants');

const {
  NAME_MIN,
  NAME_MAX,
  VERIFICATION_CODE_MIN,
  VERIFICATION_CODE_MAX,
  NEWPASSWORD_CODE_ERROR,
  PASSWORD_MAX,
  PASSWORD_MIN,
  REGISTRATION_ERROR
  } = require('../constants');


const schema = Joi.object().keys({
  lang:Joi.string()
    .required()
    .min(1)
    .max(3),
  password: Joi.string()
    .required()
    .regex(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)
    .min(PASSWORD_MIN)
    .max(PASSWORD_MAX),
  verification_code:Joi.string()
    .required()
    .min(VERIFICATION_CODE_MIN)
    .max(VERIFICATION_CODE_MAX),
  //confirm_password:Joi.string().valid(Joi.ref('password')),
  username: Joi.string().required().email({ minDomainAtoms: 2 }),
  profilepic_url:Joi.string()
    .required()
    .min(30)
    .max(400),
  name:Joi.string()
    .required()
    .min(NAME_MIN)
    .max(NAME_MAX)

});


async function validateRegisterPayload(req, res, next) {
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
    req.messages = { errors };
    return res.status(400).send({errors:req.messages, error: REGISTRATION_ERROR});
  }
  return next();
}

module.exports = validateRegisterPayload;
