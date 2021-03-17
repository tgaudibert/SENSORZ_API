const supertest = require('supertest');
const server = require('./index');
const chai = require('chai');
const api = supertest.agent(server);


const login = require('./features/login/unitTest/login')

const logout = require('./features/logout/unitTest/logout')

const loadCommunity = require('./features/community/unitTest/loadCommunity')
const acceptCommunityInvit = require('./features/community/unitTest/acceptCommunityInvit')
const deleteCommunity = require('./features/community/unitTest/deleteCommunity')
const excludeUser = require('./features/community/unitTest/excludeUser')
const leaveCommunity = require('./features/community/unitTest/leaveCommunity')
const sendCommunityInvit = require('./features/community/unitTest/sendCommunityInvit')

const createMasterNode = require('./features/masterNode/unitTest/createMasternode')
const generateMasterKey = require('./features/masterNode/unitTest/generateMasterkey')
const loadMasterNodes = require('./features/masterNode/unitTest/loadMasternodes')
//const updateMasterNode = require('./features/masterNode/unitTest/updateMasterNode')

const loadProfile = require('./features/profile/unitTest/loadProfile')
const updateProfile = require('./features/profile/unitTest/updateProfile')
const resetPasswordConnected = require('./features/profile/unitTest/resetPassword')
const updateProfilePicture = require('./features/profile/unitTest/updateProfilePicture')

const checkEmail = require('./features/register/unitTest/checkEmail')
const createAccount = require('./features/register/unitTest/createAccount')
const codeRegistration = require('./features/register/unitTest/codeRegistration')
//const uploadProfilePicture = require('./features/register/unitTest/uploadProfilePicture')

const resetPassword = require('./features/resetPassword/unitTest/resetPassword')
const codeResetPassword = require('./features/resetPassword/unitTest/codeResetPassword')
const newPassword = require('./features/resetPassword/unitTest/newPassword')

const deleteSensornode = require('./features/sensorNode/unitTest/deleteSensornode')
const loadSensornodes = require('./features/sensorNode/unitTest/loadSensornodes')
const loadWaitingSensors = require('./features/sensorNode/unitTest/loadWaitingSensors')
const updateSensornode = require('./features/sensorNode/unitTest/updateSensornode')

const activateMasternode = require('./features/sensorNodeData/unitTest/activateMasternode')
const insertSensordata = require('./features/sensorNodeData/unitTest/insertSensordata')

chai.should();

async function features(){

  const tokenUSER1 = await login(api)
  loadProfile(api,tokenUSER1)

  loadSensornodes(api,tokenUSER1)
  loadWaitingSensors(api,tokenUSER1)
  updateSensornode(api,tokenUSER1)
  deleteSensornode(api,tokenUSER1)

  updateProfile(api,tokenUSER1)
  updateProfilePicture(api,tokenUSER1)

  loadCommunity(api,tokenUSER1)
  sendCommunityInvit(api,tokenUSER1)


  const masternodeTOKEN = await generateMasterKey(api,tokenUSER1)
  activateMasternode(api,masternodeTOKEN)
  insertSensordata(api,masternodeTOKEN)


  //logout(api,tokenUSER1)
  //login


  checkEmail(api)
  codeRegistration(api)
  const tokenUSER2 = await createAccount(api)

  acceptCommunityInvit(api,tokenUSER2)
  loadCommunity(api,tokenUSER2)
  leaveCommunity(api,tokenUSER2)


  sendCommunityInvit(api,tokenUSER1)
  acceptCommunityInvit(api,tokenUSER2)
  excludeUser(api,tokenUSER1)



  createMasterNode(api,tokenUSER2)
  deleteCommunity(api,tokenUSER2)
  //logout(api,tokenUSER2)




  resetPassword(api,tokenUSER1)
  codeResetPassword(api)
  newPassword(api)
  //deleteSensornode(api,tokenUSER1)





  //resetPasswordConnected(api,tokenUSER1)
  //console.log(token)

}


features()
