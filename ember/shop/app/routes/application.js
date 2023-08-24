import Route from '@ember/routing/route';
import { products } from '../data/products';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service
  store;

  model() {
    let totalProduct = [];
    products.forEach((ele) => {
      let product = this.store.createRecord('product', ele);
      totalProduct.push(product);
    });
    return totalProduct;
  }
}
