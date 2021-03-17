
// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type serverd by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR


const LOW_BATTERY = 'LOW_BATTERY'
const WEAK_SIGNAL = 'WEAK_SIGNAL'
const LOW_LEVEL = 'LOW_LEVEL'
const MASTERNODE_CONNECTED = 'MASTERNODE_CONNECTED'
const NEW_PENDING_SENSOR = 'NEW_PENDING_SENSOR'
const NEW_MASTERNODE = 'NEW_MASTERNODE'

const FETCH_INFO_ERROR_MESSAGE = 'FETCH_DASHBOARD_ERROR';

module.exports = {
  FETCH_INFO_ERROR_MESSAGE,
  LOW_BATTERY,
  WEAK_SIGNAL,
  LOW_LEVEL,
  MASTERNODE_CONNECTED,
  NEW_PENDING_SENSOR,
  NEW_MASTERNODE
};
