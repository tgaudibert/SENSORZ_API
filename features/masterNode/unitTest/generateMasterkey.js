

const chai = require('chai');
chai.should();

const ENDPOINT = '/masternode/1/generate_key'


function generateMasterKey(api, token){
  return new Promise((resolve,reject)=>{
    describe('generateMasterkey', () => {
      it(`GET ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
        api.get(ENDPOINT)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.status.should.equal(200);
            resolve(res.body.token)
            done();
          });
      });

    })
  })
}


module.exports = generateMasterKey
