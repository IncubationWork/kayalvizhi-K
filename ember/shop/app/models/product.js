import Model, { attr, belongsTo } from '@ember-data/model';

export default class ProductModel extends Model {
  @belongsTo('user', {
    async: true,
    inverse: 'product',
  })
  user;
  @attr picImg;
  @attr name;
  @attr reelPrice;
  @attr realPrice;
  @attr stock;
  @attr quantity;
  @attr detail;
  @attr checkCart;
}
