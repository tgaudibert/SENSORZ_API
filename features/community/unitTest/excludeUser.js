
const chai = require('chai');
chai.should();

const ENDPOINT = '/community/exclude'


function excludeUser(api, token){
  describe('excludeUser', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
          username:'thomas.gaudibert@gmail.com',
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

module.exports = excludeUser;
