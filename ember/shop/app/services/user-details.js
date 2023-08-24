import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class UserDetailsService extends Service {
  @service
  store;

  user = null;

  createUserRecord(userDetail) {
    this.user = this.store.createRecord('user', userDetail);
    return this.user;
  }
}
