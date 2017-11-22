// @flow

import BlotFormatter from '../BlotFormatter';

export default class BlotSpec {
  formatter: BlotFormatter;

  constructor(formatter: BlotFormatter) {
    this.formatter = formatter;
  }

  init(): void {}

  getTargetElement(): ?HTMLElement {
    return null;
  }

  getOverlayTarget(): ?HTMLElement {
    return this.getTargetElement();
  }

  setSelection(): void {
    this.formatter.quill.setSelection(null);
  }

  onHide() {}
}
