const { wrap } = require('async-middleware');

const excludeUser = require('./community_commands/excludeUser');
const leaveCommunity = require('./community_commands/leaveCommunity');
const deleteCommunity = require('./community_commands/deleteCommunity');
const loadCommunity = require('./community_commands/loadCommunity');
const sendCommunityInvit = require('./community_commands/sendCommunityInvit');

const validateSendInvitCommunityPayload= require('./community_commands/validateSendInvitCommunityPayload');
const validateAcceptCommunityPayload = require('./community_commands/validateAcceptCommunityPayload');
const validateExcludeUserPayload = require('./community_commands/validateExcludeUserPayload');
const acceptCommunityInvit = require('./community_commands/acceptCommunityInvit');

var path = __filename.replace(global.__basedir,'');
const debug = require('debug')('express:'+path);



module.exports = (router, middlewares = []) => {
  router.get('/community/:id_masternode/me',middlewares.map(middleware => wrap(middleware)),  wrap(loadCommunity));
  router.get('/community/:id_masternode/delete',middlewares.map(middleware => wrap(middleware)), wrap(deleteCommunity));
  router.get('/community/:id_masternode/leave',middlewares.map(middleware => wrap(middleware)), wrap(leaveCommunity));
  router.post('/community/exclude',middlewares.map(middleware => wrap(middleware)),wrap(validateExcludeUserPayload),  wrap(excludeUser));
  router.post('/community/accept',middlewares.map(middleware => wrap(middleware)),wrap(validateAcceptCommunityPayload),  wrap(acceptCommunityInvit));
  router.post('/community/me/invite',middlewares.map(middleware => wrap(middleware)),wrap(validateSendInvitCommunityPayload),  wrap(sendCommunityInvit));
  return router;
};
