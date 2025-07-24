const assert = require('assert');
const app = require('../../src/app');

describe('\'paymentMode\' service', () => {
  it('registered the service', () => {
    const service = app.service('paymentMode');

    assert.ok(service, 'Registered the service (paymentMode)');
  });
});
