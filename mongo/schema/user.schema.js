const Schema = require('mongoose').Schema;

const schema_obj = {
  first_name: {
    type: String,
    trim: true
  },
  surname: {
    type: String,
    trim: true
  }
}

module.exports = new Schema(schema_obj, {collection: 'users', strict: true});