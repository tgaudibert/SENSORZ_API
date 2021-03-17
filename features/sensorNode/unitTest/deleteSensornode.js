
const chai = require('chai');
chai.should();

const ENDPOINT = '/sensors/1/delete'


function deleteSensorNode(api, token){
    describe('deleteSensorNode', () => {
      it(`GET ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
        api.get(ENDPOINT)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.status.should.equal(200);
            done();
          });
      });

    })
}


module.exports = deleteSensorNode
