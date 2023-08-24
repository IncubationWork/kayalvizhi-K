import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store;

  @service router;

  @service userDetails;

  @tracked
  idcount = 0;

  @tracked
  userDeatilModel = [];

  @tracked name = '';
  @tracked email = '';
  @tracked number = '';

  @action
  adduser() {
    let userDetail = {
      id: this.idcount++,
      name: this.name,
      email: this.email,
      number: this.number,
    };

    let userRecord = this.userDetails.createUserRecord(userDetail);
    /*this.userDetails.set('user', userDetail);*/

    this.set('name', '');
    this.set('number', '');
    this.set('email', '');

    this.router.transitionTo('products');
  }

  /*let userDeatil = this.store.createRecord('user');
    userDeatil.id = this.idcount++;
    userDeatil.name = this.name;
    userDeatil.email = this.email;
    userDeatil.number = this.number;
    this.userDeatilModel.push(this.userDeatil);
    this.set('name', '');
    this.set('number', '');
    this.set('email', '');
    this.router.transitionTo('products');
    let userDetail = this.store.createRecord('user', {
      id: this.idcount++,
      name: this.name,
      email: this.email,
      number: this.number,
    });

    userDetail
      .save()
      .then(() => {
        this.userDeatilModel.pushObject(userDetail);
        this.set('name', '');
        this.set('number', '');
        this.set('email', '');
        this.router.transitionTo('products');
      })
      .catch((error) => {
        console.error('Error saving user detail:', error);
      });*/

  @action
  checkUserData() {
    let regName = /^[a-zA-Z]{2,30}$/;
    let mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let number = /^[0-9]{10}$/;

    if (regName.test(this.name) && mailformat.test(this.email)) {
      if (number.test(this.number)) {
        this.adduser();
      } else {
        this.setErrorAndClear(
          'number',
          'errForNumber',
          'Kindly give a 10 digit number'
        );
      }
    } else {
      if (!(regName.test(this.name) && this.name != undefined)) {
        this.setErrorAndClear(
          'name',
          'errForName',
          'Kindly give a proper name'
        );
      }

      if (!number.test(this.number)) {
        this.setErrorAndClear(
          'number',
          'errForNumber',
          'Kindly give a 10 digit number'
        );
      }

      if (!mailformat.test(this.email)) {
        this.setErrorAndClear(
          'email',
          'errForEmail',
          'Kindly give a proper email'
        );
      }
    }
  }

  setErrorAndClear(type, property, message) {
    this.set(type, '');
    this.set(property, message);
    setTimeout(() => {
      this.set(property, '');
    }, 2000);
  }
}
