
const chai = require('chai');
chai.should();

const ENDPOINT = '/community/3/delete'


function deleteCommunity(api, token){
  describe('deleteCommunity', () => {
    it(`GET ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.get(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });

    it(`GET ${ENDPOINT} + NOTOKEN --> 401 (UNAUTHORIZED)`, (done) => {
      api.get(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          res.status.should.equal(401);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}

module.exports = deleteCommunity;
