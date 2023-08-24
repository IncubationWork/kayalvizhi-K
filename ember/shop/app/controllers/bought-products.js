import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BoughtProductsController extends Controller {
  @service
  store;

  @service
  shoppingCart;

  @tracked
  selectedProducts = this.shoppingCart.addCartDetails;

  @tracked
  realPrice;

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
