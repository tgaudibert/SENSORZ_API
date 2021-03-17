
const chai = require('chai');
chai.should();

const ENDPOINT = '/register/finalize'

function createAccount(api){
  return new Promise((resolve,reject)=>{
    describe('finalizeRegistration', () => {
      it(`POST ${ENDPOINT} + EMAIL AVAILABLE --> 200 (Success)`, (done) => {
        api.post(ENDPOINT)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .send({
            username:'thomas.gaudibert@gmail.com',
            name:'thomas',
            password:'Babababa35',
            verification_code:'123456',
            profilepic_url:'https://maphotodeprofile.com/usr.jpeg',
            lang:'FR'
          })
          .end((err, res) => {
            res.status.should.equal(200);
            resolve(res.body.token)
            //res.body.result.should.equal(5);
            done();
          });
      });
    })
  })
}


module.exports = createAccount
