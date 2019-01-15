const env = require('../env');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

if (env.isDev) {
  // mongoose.set('debug', true);
}

const dbIsReady = () => {
  const testDb = new Promise((resolve, reject) => {
    if (env.isDev) {
      function connect() {
        const testConnection = mongoose.createConnection(env.db_uri_test, {useNewUrlParser: true});
        testConnection.on('connected', function () {
        console.log('-> ', 'Mongoose test has been connected!');
          resolve({testConnection});
        });
        testConnection.on('error', function (err) {
          console.log('->', 'test connection error trying to reconnect ...');
          setTimeout(connect, 1000);
        });
      }
      connect();
    } else {
      resolve();
    }
  });

  const prodDb = new Promise((resolve, reject) => {
    function connect() {
      const prodConnection = mongoose.createConnection(env.db_uri, {useNewUrlParser: true});
      prodConnection.on('connected', function () {
        console.log('-> ', 'Mongoose product has been connected!');
        resolve({prodConnection});
      });
      prodConnection.on('error', function () {
        console.log('->', 'test connection error trying to reconnect ...');
        setTimeout(connect, 1000);
      });
    }
    connect();
  });

  return Promise.all([testDb, prodDb]);
}


module.exports = {
  dbIsReady
}