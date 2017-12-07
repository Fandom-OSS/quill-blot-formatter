// @flow

import BlotFormatter from '../BlotFormatter';

export default class Action {
  formatter: BlotFormatter;

  constructor(formatter: BlotFormatter) {
    this.formatter = formatter;
  }

  onCreate() {}

  onDestroy() {}

  onUpdate() {}
}
