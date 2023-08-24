import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ViewcartPageComponent extends Component {
  @service
  store;

  @service
  router;

  @service
  shoppingCart;

  @service
  userDetails;

  @tracked
  selectedProducts = this.shoppingCart.addCartDetails;

  @tracked
  realPrice;

  @tracked
  count = 1;

  @action
  boughtProduct() {
    if (!this.userDetails.user) {
      alert('Please Sign in');
      this.router.transitionTo('index');
    } else {
      this.shoppingCart.addCartDetails.forEach((ele) => {
        ele.user = this.userDetails.user;
      });
      this.router.transitionTo('bought-products');
    }
  }
  /*boughtProduct() {
    if (this.store.peekAll('user').content.length == 0) {
      alert('please Sigin');
      this.router.transitionTo('index');
    } else {
      this.shoppingCart.addCartDetails.forEach((ele) => {
        ele.user = this.store.peekRecord('user', 0);
      });
      this.router.transitionTo('bought-products');
    }
  }*/

  @computed('realPrice', 'selectedProducts', 'selectedProducts.@each.quantity')
  get subtotal() {
    this.realPrice = 0;
    this.selectedProducts.forEach((element) => {
      this.realPrice += element.realPrice * element.quantity;
    });
    return this.realPrice;
  }

  @computed('subtotal')
  get tax() {
    return this.subtotal * 0.09;
  }

  @computed('subtotal', 'tax')
  get total() {
    return this.subtotal + this.tax;
  }
}
