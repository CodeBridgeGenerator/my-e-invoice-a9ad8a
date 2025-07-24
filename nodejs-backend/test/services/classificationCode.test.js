const assert = require('assert');
const app = require('../../src/app');

describe('\'classificationCode\' service', () => {
  it('registered the service', () => {
    const service = app.service('classificationCode');

    assert.ok(service, 'Registered the service (classificationCode)');
  });
});
