const assert = require('assert');
const app = require('../../src/app');

describe('\'countryCode\' service', () => {
  it('registered the service', () => {
    const service = app.service('countryCode');

    assert.ok(service, 'Registered the service (countryCode)');
  });
});
