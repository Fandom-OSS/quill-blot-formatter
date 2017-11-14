// @flow

import { BlotSpec } from './BlotSpec';

export default class ImageSpec implements BlotSpec {
  static canHandle(el: HTMLElement): boolean {
    return el.tagName === 'IMG';
  }
  static create(el: HTMLElement): ImageSpec {
    return new ImageSpec(el);
  }

  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  getTargetElement(): HTMLElement {
    return this.el;
  }

  getOverlayTarget(): HTMLElement {
    return this.el;
  }
}
