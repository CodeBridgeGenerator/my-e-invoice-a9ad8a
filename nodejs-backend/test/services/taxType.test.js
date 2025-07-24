const assert = require('assert');
const app = require('../../src/app');

describe('\'taxType\' service', () => {
  it('registered the service', () => {
    const service = app.service('taxType');

    assert.ok(service, 'Registered the service (taxType)');
  });
});
