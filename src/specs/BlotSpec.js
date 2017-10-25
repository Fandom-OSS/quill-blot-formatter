// @flow

export default class BlotSpec {
  blotName: string;

  constructor(blotName: string) {
    this.blotName = blotName;
  }

  canHandle(el: HTMLElement) {
    return el.tagName === this.blotName;
  }

  // eslint-disable-next-line class-methods-use-this
  getResizeTarget(el: HTMLElement) {
    return el;
  }
}
