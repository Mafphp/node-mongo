const models = require('../mongo/models.mongo');
class Base {
  constructor(modelName, test) {
    modelName = test ? `${modelName}Test` : modelName;
    this.model = models()[modelName];
  }
}

module.exports = Base;