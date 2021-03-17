const chai = require('chai');
chai.should();



function login(api){
  return new Promise((resolve,reject)=>{
    describe('login', () => {

      it('POST /login + BAD CREDENTIALS --> 400 (BAD REQUEST)', (done) => {
        api.post('/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            username: "admin@gmail.com",
            password: "Babababa35uej"
          })
          .end((err, res) => {
            res.status.should.equal(400);
            done();
          });
      });

      it('POST /login + GOOD CREDENTIALS --> 200 (Login Success)', (done) => {
        api.post('/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            username: "admin@gmail.com",
            password: "Babababa35"
          })
          .end((err, res) => {
            res.status.should.equal(200);
            resolve(res.body.token)
            done();
          });
      });
    })
  })
}


module.exports = login
