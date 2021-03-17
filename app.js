require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

global.__basedir = __dirname;




const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
var bodyParser = require('body-parser');
const morgan = require('morgan')
const Sentry = require('@sentry/node');


const indexRouter = require('./routes/index');
const notificationService = require('./user_Notifications/main')




const app = express();
const io = app.io = require('socket.io')();
const socket = require('./socket_namespace');

Sentry.init({ dsn: 'https://f77bcc27f39b4566a132477795e77d65@o382914.ingest.sentry.io/5212502' });
app.use(Sentry.Handlers.requestHandler());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet())
app.use(cors());

if(process.env.NODE_ENV != "GITLABCI"){
  app.use(morgan('combined'))
}



app.use('/', indexRouter);




//INTERNAL SERVER ERROR HANDLING
app.use(Sentry.Handlers.errorHandler());
app.use(function(err, req, res, next) {
  console.log(err)
  Sentry.captureException(err);
  res.status(500).send({error:'INTERNAL_ERROR'})
});



socket.createNameSpace(io)


module.exports = {
  app
};
