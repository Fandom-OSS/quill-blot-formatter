// @flow

import BlotResize from '../BlotResize';

export default class BlotSpec {
  resizer: BlotResize;

  constructor(resizer: BlotResize) {
    this.resizer = resizer;
  }

  // eslint-disable-next-line class-methods-use-this
  getTargetElement(): ?HTMLElement {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  getOverlayTarget(): ?HTMLElement {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  onHide() {}
}
