// @flow

import BlotSpec from './BlotSpec';
import BlotResize from '../BlotResize';

export default class ImageSpec extends BlotSpec {
  el: ?HTMLElement;

  constructor(resizer: BlotResize) {
    super(resizer);
    this.el = null;

    this.resizer.quill.root.addEventListener('click', this.onClick);
  }

  getTargetElement(): ?HTMLElement {
    return this.el;
  }

  getOverlayTarget(): ?HTMLElement {
    return this.el;
  }

  onHide() {
    this.el = null;
  }

  onClick = (event: MouseEvent) => {
    const el = event.target;
    if (!(el instanceof HTMLElement) || el.tagName !== 'IMG') {
      return;
    }

    this.el = el;
    this.resizer.show(this);
  };
}
