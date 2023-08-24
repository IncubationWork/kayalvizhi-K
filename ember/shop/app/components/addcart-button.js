import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { computed, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddcartButtonComponent extends Component {
  @service
  shoppingCart;

  @tracked
  checkValue = this.args.cartData.checkCart;

  @tracked
  quantity = this.args.cartData.quantity;

  @computed('args.cartData.quantity', 'checkValue')
  get toggleBody() {
    if (this.args.cartData.quantity == 0) {
      return true;
    } else {
      return false;
    }
  }

  @computed('quantity')
  get calcQuantity() {
    return this.quantity;
  }

  @action
  changeValue(value) {
    this.shoppingCart.addCartDetails.push(value);
    this.args.cartData.quantity = 0;
    this.quantity = 1;
    this.args.cartData.quantity++;
    this.checkValue = false;
  }

  @action
  increQuantity() {
    this.quantity++;
    this.args.cartData.quantity++;
  }

  @action
  decreQuantity() {
    this.args.cartData.quantity--;
    this.quantity--;
    if (this.args.cartData.quantity == 0) {
      const index = this.shoppingCart.addCartDetails.indexOf(
        this.args.cartData
      );
      if (index > -1) {
        this.shoppingCart.addCartDetails.splice(index, 1);
      }
      this.checkValue = true;
    }
  }
}
