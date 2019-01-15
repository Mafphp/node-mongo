const rp = require('request-promise');
const helpers = require('../../../utils/helpers');
const dbHelpers = require('../../../utils/db-helpers');
const models = require('../../../mongo/models.mongo');

describe('show all products', () => {
  beforeEach(async (done) => {
    try {
      await dbHelpers.dropAll();

      const products = [{
        title: 't1',
        price: 1,
        description: 'some1'
      }, {
        title: 't2',
        price: 2,
        description: 'some2'
      }];

      await models()['ProductTest'].insertMany(products)

      done();
    } catch (err) {
      console.log('err ->', err);
      done();
    }
  });


  it('should be return all products', (async (done) => {
    try {
      this.done = done;
      let res = await rp({
        uri: helpers.apiTestURL('products'),
        method: 'GET',
        body: {},
        resolveWithFullResponse: true,
        json: true
      });

      expect(res.statusCode).toBe(200);
      res = res.body;

      expect(res.length).toBe(2);
      
      done();
    } catch (err) {
      console.log('err ->', err);
      done();
    }
  }));
})