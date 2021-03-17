const { wrap } = require('async-middleware');
const loadProfile = require('./profile_commands/loadProfile');
const resetPassword = require('./profile_commands/resetPassword');
const updateProfile = require('./profile_commands/updateProfile');
const updateProfilePicture = require('./profile_commands/updateProfilePicture');
const validateProfilePayload = require('./profile_commands/validateProfilePayload');


var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);
const {memoryUploads} = require('../../db/multerConfig');


module.exports = (router, middlewares = []) => {
  router.get('/profile/me',middlewares.map(middleware => wrap(middleware)),  wrap(loadProfile));
  router.post('/profile/me',middlewares.map(middleware => wrap(middleware)),wrap(validateProfilePayload),  wrap(updateProfile));
  router.post('/profile/me/profile_pic/url',middlewares.map(middleware => wrap(middleware)), wrap(updateProfilePicture));
  //router.post('/profile/me/profile_pic/upload',middlewares.map(middleware => wrap(middleware)), memoryUploads ,  wrap(updateProfilePicture));
  router.post('/profile/password/authentified_reset',middlewares.map(middleware => wrap(middleware)) , wrap(resetPassword));
  return router;
};
