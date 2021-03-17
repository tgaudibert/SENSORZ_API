
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
const INTERNAL_ERROR = 'INTERNAL_ERROR'

module.exports = {
  LOW_BATTERY,
  WEAK_SIGNAL,
  LOW_LEVEL,
  MASTERNODE_CONNECTED,
  NEW_PENDING_SENSOR,
  NEW_MASTERNODE,
  INTERNAL_ERROR
};
