
const chai = require('chai');
chai.should();

const ENDPOINT = '/masternode/create'


function createMasternode(api, token){
  describe('createMasternode', () => {
    it(`POST ${ENDPOINT} + TOKEN --> 200 (Success)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .send({
          masternode_name:"Plelan"
        })
        .end((err, res) => {
          res.status.should.equal(200);
          //res.body.result.should.equal(5);
          done();
        });
    });

    it(`POST ${ENDPOINT} + NOTOKEN --> 401 (UNAUTHORIZED)`, (done) => {
      api.post(ENDPOINT)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .send({
          masternode_name:"Pl"
        })
        .end((err, res) => {
          res.status.should.equal(401);
          //res.body.result.should.equal(5);
          done();
        });
    });
  })
}


module.exports = createMasternode
