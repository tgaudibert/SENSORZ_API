const chai = require('chai');
chai.should();

const ENDPOINT = '/auth/logout'

function logout(api, token){
  describe('Logout', () => {
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
  })
}

module.exports = logout
