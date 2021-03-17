require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

global.Promise = require('bluebird');


//PART TO TEST CONNECTION ---
// DON'T TRY TO UNDERSTAND
// ----------------------

var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);

db.result('SELECT NOW()')
    .then(function (result) {
      console.log(result)
    })
    .catch(function (err) {
      console.log(error)
    });




let connectionParams
connectionParams = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
};

if (process.env.DATABASE_URL){
  connectionParams ={
    connectionString: process.env.DATABASE_URL,
  }
}


module.exports = connectionParams
