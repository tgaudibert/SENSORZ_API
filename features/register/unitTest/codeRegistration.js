
const chai = require('chai');
chai.should();

const ENDPOINT = '/register/validate'

function codeRegistration(api){
  describe('validateCode', () => {
    it(`POST ${ENDPOINT} + CORRECT CODE --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          username:'thomas.gaudibert@gmail.com',
          verification_code:'123456'
        })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}

module.exports = codeRegistration;
