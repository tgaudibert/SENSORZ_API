require('dotenv').config({
  path: `../../env-files/${process.env.NODE_ENV || 'development'}.env`,
});


global.Promise = require('bluebird');
// knexfile.js
module.exports = {
  appId:    process.env.CHANNELS_APPID,
  key:      process.env.CHANNELS_KEY,
  secret:   process.env.CHANNELS_SECRET,
  cluster:  process.env.CHANNELS_CLUSTER,
  useTLS:   true
};
