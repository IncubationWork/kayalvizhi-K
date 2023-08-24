import { module, test } from 'qunit';
import { setupTest } from 'shop/tests/helpers';

module('Unit | Controller | bought-products', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:bought-products');
    assert.ok(controller);
  });
});
