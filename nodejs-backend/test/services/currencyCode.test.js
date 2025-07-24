const assert = require('assert');
const app = require('../../src/app');

describe('\'currencyCode\' service', () => {
  it('registered the service', () => {
    const service = app.service('currencyCode');

    assert.ok(service, 'Registered the service (currencyCode)');
  });
});
