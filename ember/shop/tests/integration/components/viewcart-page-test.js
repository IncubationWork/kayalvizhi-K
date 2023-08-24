import { module, test } from 'qunit';
import { setupRenderingTest } from 'shop/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | viewcart-page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ViewcartPage />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ViewcartPage>
        template block text
      </ViewcartPage>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
