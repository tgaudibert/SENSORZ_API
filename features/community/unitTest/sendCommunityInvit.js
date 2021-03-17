
const chai = require('chai');
chai.should();

const ENDPOINT = '/community/me/invite'


function sendCommunityInvit(api, token){
  describe('sendCommunityInvit', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
           email:'thomas.gaudibert@gmail.com',
           id_masternode: 1
        })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });

  })
}

module.exports = sendCommunityInvit;
