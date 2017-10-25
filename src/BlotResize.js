// @flow

import deepmerge from 'deepmerge';
import type { BlotResizeOptions } from './Options';
import DefaultOptions from './Options';

const dontMerge = (destination: Array<any>, source: Array<any>) => source;

export default class BlotResize {
  quill: any;
  options: BlotResizeOptions;

  constructor(quill: any, options: $Shape<BlotResizeOptions> = {}) {
    this.quill = quill;
    this.options = deepmerge(DefaultOptions, options, { arrayMerge: dontMerge });

    // disable native image resizing on firefox
    document.execCommand('enableObjectResizing', false, 'false'); // eslint-disable-line no-undef
    this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';
    this.quill.root.addEventListener('click', this.onClick, false);
  }

  onClick = (event: Event) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) { // eslint-disable-line no-undef
      return;
    }

    this.options.specs.forEach((spec) => {
      spec.canHandle(target);
    });
  }
}
