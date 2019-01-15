const mongo = require('../mongo');


function dropAll() {
  return new Promise((resolve, reject) => {
     mongo.dbIsReady().then(res => {
      const testConnection = res.find(x => x.testConnection).testConnection;
      testConnection.db.dropDatabase(function (err, result) {
        if (!err) {
          console.log('database is dropped!');
          resolve()
        } else
          reject()
      });
    });
  })

}

module.exports = {
  dropAll
}