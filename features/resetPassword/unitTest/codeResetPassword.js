
const chai = require('chai');
chai.should();

const ENDPOINT = '/resetpassword/validate'


function codeResetPassword(api){
  describe('codeResetPassword', () => {
    it(`POST ${ENDPOINT} GOOD CODE --> 200 (Success)`, (done) => {
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

    it(`POST ${ENDPOINT} BAD CODE --> 400 (BAD REQUEST)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          username:'thomas.gaudibert@gmail.com',
          verification_code:'1234'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}

module.exports = codeResetPassword;
