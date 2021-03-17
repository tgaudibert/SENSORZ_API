
const chai = require('chai');
chai.should();

const ENDPOINT = '/resetpassword/new'


function newPassword(api){
  describe('newPassword', () => {
    it(`POST ${ENDPOINT} + GOOD PWD --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          username: 'thomas.gaudibert@gmail.com',
          verification_code:'123456',
          password: 'Babababa357',
          confirm_password: 'Babababa357'
        })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });

    it(`POST ${ENDPOINT} + BAD PWD --> 400 (BAD REQUEST)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          username: 'thomas.gaudibert@gmail.com',
          verification_code:'12345679',
          password: 'Bab',
          confirm_password: 'Bab'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}

module.exports = newPassword;
