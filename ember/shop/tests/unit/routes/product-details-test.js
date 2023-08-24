import { module, test } from 'qunit';
import { setupTest } from 'shop/tests/helpers';

module('Unit | Route | product-details', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:product-details');
    assert.ok(route);
  });
});
