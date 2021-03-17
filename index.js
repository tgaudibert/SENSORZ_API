require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});


const http = require('http');
const redis = require('socket.io-redis');
const db = require('./db/postgresfile')
const {app} = require('./app')
const { redisConfig } = require('./auth/redisfile')

// Server
const server = http.createServer(app);

// Atach server to the socket
app.io.attach(server)

// Origin socket configuration
app.io.origins('*:*')

// Using the adapter to pass event between nodes
app.io.adapter(redis(redisConfig));


server.listen(process.env.PORT || port, '0.0.0.0',() => console.log(`App listening on port ${process.env.PORT}!`))


module.exports = server
