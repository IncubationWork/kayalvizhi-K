import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @hasMany('product', {
    async: true,
    inverse: 'user',
  })
  product;

  @attr name;
  @attr email;
  @attr number;
}
