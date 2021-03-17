
const chai = require('chai');
chai.should();

const ENDPOINT = '/profile/me/profile_pic/url'

function updateProfile(api, token){
  describe('updateProfile', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connetion', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
            pic_url:'https://masuperphoto.com'
          })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });


  })
}


module.exports = updateProfile
