const models = require('../mongo/models.mongo');
const env = require('../env');
class User {

  constructor(test = User.test) {
    console.log('test is ->', test);
  }

  async getAll() {
    console.log('models', models);
    const result = await models()['User'].insertMany([{first_name: 'alireza', surname: 'hoseinzade'}])
    return result;
  }

}

User.test = false;
module.exports = User;