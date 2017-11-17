// @flow

import BlotFormatter from '../BlotFormatter';

export default class BlotSpec {
  formatter: BlotFormatter;

  constructor(formatter: BlotFormatter) {
    this.formatter = formatter;
  }

  // eslint-disable-next-line class-methods-use-this
  init(): void {}

  // eslint-disable-next-line class-methods-use-this
  getTargetElement(): ?HTMLElement {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  getOverlayTarget(): ?HTMLElement {
    return this.getTargetElement();
  }

  // eslint-disable-next-line class-methods-use-this
  onHide() {}
}
