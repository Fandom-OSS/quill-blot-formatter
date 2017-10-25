// @flow

import Action from './Action';

export default class Alignment extends Action {
  toolbar: any;

  onCreate() {
    this.toolbar = 'test';
    console.log(this.toolbar);
  }
}
