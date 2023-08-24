import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductDetailsRoute extends Route {
  @service
  store;

  model(para) {
    const { id } = para;
    let product = this.store.peekRecord('product', id);
    return product;
  }
}
