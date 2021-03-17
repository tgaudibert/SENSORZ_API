require('dotenv').config({
  path: `../../env-files/${process.env.NODE_ENV || 'development'}.env`,
});


global.Promise = require('bluebird');
// knexfile.js
module.exports = {
  instanceId: process.env.BEAMS_INSTANCE,
  secretKey:  process.env.BEAMS_SECRET
};
