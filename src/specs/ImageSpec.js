// @flow

import BlotSpec from './BlotSpec';
import BlotResize from '../BlotResize';

export default class ImageSpec extends BlotSpec {
  img: ?HTMLElement;

  constructor(resizer: BlotResize) {
    super(resizer);
    this.img = null;
  }

  init() {
    this.resizer.quill.root.addEventListener('click', this.onClick);
  }

  getTargetElement(): ?HTMLElement {
    return this.img;
  }

  onHide() {
    this.img = null;
  }

  onClick = (event: MouseEvent) => {
    const el = event.target;
    if (!(el instanceof HTMLElement) || el.tagName !== 'IMG') {
      return;
    }

    this.img = el;
    this.resizer.show(this);
  };
}
