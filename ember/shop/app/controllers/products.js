import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProductsController extends Controller {
    @service
    shoppingCart;

  @tracked 
    cartArray=[];
  
  @action
    addToCart(data){
      this.cartArray.push(data);
      return this.cartArray.filter((value,index)=>this.cartArray.indexOf(value)===index);
    } 
}
