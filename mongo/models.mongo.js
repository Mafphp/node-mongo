const db = require('./index');

let schemas = {
  UserSchema: require('./schema/user.schema'),
  ProductSchema: require('./schema/product.schema'),
};

// can save data out of schema using strict: false
let models = {};

db.dbIsReady().then((res) => {
  for (let key in schemas) {
    if (schemas.hasOwnProperty(key)) {
      let newKey = key.replace('Schema', '');
      models[newKey] = res.find(x => x.prodConnection).prodConnection.model(newKey, schemas[key]);
      models[newKey + 'Test'] = res.find(x => x.testConnection).testConnection.model(newKey, schemas[key]);
    }
  }
}).catch(err => {});

module.exports = () => models;
