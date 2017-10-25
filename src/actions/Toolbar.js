// @flow

import Action from './Action';

export default class Toolbar extends Action {
  toolbar: any;

  onCreate() {
    this.toolbar = 'test';
    console.log(this.toolbar);
  }
}
