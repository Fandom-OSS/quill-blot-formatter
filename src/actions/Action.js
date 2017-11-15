// @flow

import BlotResize from '../BlotResize';

export default class Action {
  resizer: BlotResize;

  constructor(resizer: BlotResize) {
    this.resizer = resizer;
  }

  onCreate() {} // eslint-disable-line class-methods-use-this

  onDestroy() {} // eslint-disable-line class-methods-use-this

  onUpdate() {} // eslint-disable-line class-methods-use-this
}
