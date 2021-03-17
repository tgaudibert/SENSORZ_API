
const chai = require('chai');
chai.should();

const ENDPOINT = '/sensors/me/update'


function updateSensornode(api, token){
  describe('updateSensornode', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
          sensornode_name:"Plelan1",
          sensornode_product:"Chlore",
          isactive:1,
          id_sensornode:1,
        })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });

    it(`POST ${ENDPOINT} + NOTOKEN --> 401 (UNAUTHORIZED)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          sensornode_name:"Pl"
        })
        .end((err, res) => {
          res.status.should.equal(401);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}


module.exports = updateSensornode
