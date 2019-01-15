const rp = require('request-promise');
const helpers = require('../../../utils/helpers');
const dbHelpers = require('../../../utils/db-helpers');

describe('show all users', () => {
  beforeEach(async (done) => {
    try {
      await dbHelpers.dropAll();

      done()
    } catch (err) {
      console.log('err ->', err);
      done();
    }
  });

  it('should be show all users', (async (done) => {
    try {
      this.done = done;
      const res = await rp({
        url: helpers.apiTestURL('users'),
        method: 'GET',
        body: {},
        resolveWithFullResponse: true,
        json: true
      });


      done();
    } catch (err) {
      console.log('err', err);
      done();
    }
  }));
});