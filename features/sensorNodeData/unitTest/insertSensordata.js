
const chai = require('chai');
chai.should();

const ENDPOINT = '/sensor/data'
const data = '1:DHFHEIOZDZ:1:1:82:100:100'

function insertSensorData(api, MASTERNODE_TOKEN){
  describe('insertSensorData', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 201 (SENSORNODE_CREATED)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + MASTERNODE_TOKEN)
        .send({
          rssi:'70',
          snr:'70',
          data:data,
        })
        .end((err, res) => {
          res.status.should.equal(201);
          //res.body.result.should.equal(5);
          done();
        });
    });

    it(`POST ${ENDPOINT} + NOTOKEN --> 401 (UNAUTHORIZED)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          rssi:'70',
          snr:'70',
          data:data
        })
        .end((err, res) => {
          res.status.should.equal(401);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}


module.exports = insertSensorData
