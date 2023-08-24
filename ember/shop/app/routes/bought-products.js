import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BoughtProductsRoute extends Route {
  @service
  userDetails;

  @service
  shoppingCart;

  model() {
    return this.userDetails.user;
    /*const userDetails = this.controllerFor('index').get('userDetailsService');
    return userDetails.get('user');
    let user = this.store.peekRecord('user', 0);
    return user;*/
  }
}
