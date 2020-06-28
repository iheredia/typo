require('@babel/register')({
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
});

const server = require('./src/server')

if (process.env.DETA_EMULATED) {
  server.listen(8080);
  console.log('Listening http://localhost:8080');
}

module.exports = server;
