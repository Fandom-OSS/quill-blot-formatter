// @flow

import BlotFormatter from '../BlotFormatter';

export default class Action {
  formatter: BlotFormatter;

  constructor(formatter: BlotFormatter) {
    this.formatter = formatter;
  }

  onCreate() {} // eslint-disable-line class-methods-use-this

  onDestroy() {} // eslint-disable-line class-methods-use-this

  onUpdate() {} // eslint-disable-line class-methods-use-this
}
