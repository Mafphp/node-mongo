const Base = require('./base.model');

class Product extends Base {
  constructor(test = Product.isTest) {
    super('Product', test);
    this.ProductModel = this.model;
  }

  async getAll() {
    return this.ProductModel.find();
  }
}

Product.isTest = false;
module.exports = Product;