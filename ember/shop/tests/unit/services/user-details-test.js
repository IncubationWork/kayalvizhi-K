import { module, test } from 'qunit';
import { setupTest } from 'shop/tests/helpers';

module('Unit | Service | user-details', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:user-details');
    assert.ok(service);
  });
});
