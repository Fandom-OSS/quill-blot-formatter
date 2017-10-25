// @flow

import deepmerge from 'deepmerge';
import type { BlotResizeOptions } from './Options';
import DefaultOptions from './Options';
import { BlotSpec } from './specs/BlotSpec';

const dontMerge = (destination: Array<any>, source: Array<any>) => source;

export default class BlotResize {
  quill: any;
  options: BlotResizeOptions;
  currentSpec: ?BlotSpec;

  constructor(quill: any, options: $Shape<BlotResizeOptions> = {}) {
    this.quill = quill;
    this.options = deepmerge(DefaultOptions, options, { arrayMerge: dontMerge });
    this.currentSpec = null;

    // disable native image resizing on firefox
    document.execCommand('enableObjectResizing', false, 'false'); // eslint-disable-line no-undef
    this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';
    this.quill.root.addEventListener('click', (e) => { this.onClick(e); }, false);
  }

  onClick(event: Event) {
    const nextEl = event.target;
    if (!(nextEl instanceof HTMLElement)) { // eslint-disable-line no-undef
      return;
    }

    let nextSpec: ?Class<BlotSpec> = null;

    this.options.specs.forEach((spec: Class<BlotSpec>) => {
      if (spec.constructor.canHandle(nextEl)) {
        nextSpec = spec;
      }
    });

    if (!nextSpec) {
      this.hide();
      return;
    }

    // TODO: do we need to check if we're already focused?

    if (this.currentSpec) {
      this.hide();
    }

    this.show(nextSpec, nextEl);
  }

  show(spec: Class<BlotSpec>, el: HTMLElement) {
    this.currentSpec = spec.constructor.create(el);
  }

  hide() {
    this.currentSpec = null;
  }
}
