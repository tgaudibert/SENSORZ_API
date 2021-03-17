
const chai = require('chai');
chai.should();

const ENDPOINT = '/profile/me'

function updateProfile(api, token){
  describe('updateProfile', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connetion', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name:'thomas'
          })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });

    it(`POST ${ENDPOINT} + TRUNCATED JSON --> 400 (BAD REQUEST)`, (done) => {
      api.post(ENDPOINT)
        .set('Connetion', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
            name:'thomas35',
            baba:'tes'
          })
        .end((err, res) => {
          res.status.should.equal(400);
          //res.body.result.should.equal(5);
          done();
        });
    });


    it(`POST ${ENDPOINT} + NO TOKEN --> 401 (UNAUTHORIZED)`, (done) => {
      api.post(ENDPOINT)
        .set('Connetion', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
            profile_pic:'https://manouvellephotodeprofil.com/data.jpeg'
          })
        .end((err, res) => {
          res.status.should.equal(401);
          //res.body.result.should.equal(5);
          done();
        });
    });


  })
}


module.exports = updateProfile
