const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema_obj = {
  title: {
    type: String,
    trim: true
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
}

module.exports = new Schema(schema_obj, {collection: 'products', strict: true});