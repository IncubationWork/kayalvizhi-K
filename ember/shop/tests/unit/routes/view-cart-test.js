import { module, test } from 'qunit';
import { setupTest } from 'shop/tests/helpers';

module('Unit | Route | view-cart', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:view-cart');
    assert.ok(route);
  });
});
