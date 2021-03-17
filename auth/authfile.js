require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});


global.Promise = require('bluebird');
// knexfile.js
module.exports = {
  issuer        : process.env.ISSUER,
  subject       : process.env.SUBJECT,
  audience      : process.env.AUDIENCE,
  algorithm     : process.env.ALGORITHM,
};
