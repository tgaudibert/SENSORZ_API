
const chai = require('chai');
chai.should();


const ENDPOINT = '/register/check-email'

function checkEmail(api){
  describe('checkEmail', () => {
    it(`POST ${ENDPOINT} + EMAIL AVAILABLE --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          username:"thomas.gaudibert@gmail.com"
        })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });


    it(`POST ${ENDPOINT} + EMAIL TAKEN --> 400 (INVALID REQUEST)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          username:"admin@gmail.com"
        })
        .end((err, res) => {
          res.status.should.equal(400);
          //res.body.result.should.equal(5);
          done();
        });
    });


  })
}

module.exports = checkEmail;
