
const chai = require('chai');
chai.should();

const ENDPOINT = '/community/accept'


function acceptCommunityInvit(api, token){
  describe('acceptCommunityInvit', () => {
    it(`POST ${ENDPOINT} + GOOD CODE --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
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

    it(`POST ${ENDPOINT} + BAD CODE --> 400 (UNAUTHORIZED)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
          username:'thomas.gaudibert@gmail.com',
          verification_code:'1234568'
        })
        .end((err, res) => {
          res.status.should.equal(400);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}

module.exports = acceptCommunityInvit;
