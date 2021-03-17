
const chai = require('chai');
chai.should();

const ENDPOINT = '/resetpassword/request'


function resetPassword(api){
  describe('resetPassword', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          username:'thomas.gaudibert@gmail.com'
        })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}

module.exports = resetPassword;
