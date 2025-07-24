const assert = require('assert');
const app = require('../../src/app');

describe('\'stateCode\' service', () => {
  it('registered the service', () => {
    const service = app.service('stateCode');

    assert.ok(service, 'Registered the service (stateCode)');
  });
});
