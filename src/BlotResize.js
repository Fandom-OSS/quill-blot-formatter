// @flow

import deepmerge from 'deepmerge';
import type { BlotResizeOptions } from './Options';
import DefaultOptions from './Options';

export default class BlotResize {
  quill: any;
  options: BlotResizeOptions;

  constructor(quill: any, options: BlotResizeOptions = {}) {
    this.quill = quill;
    this.options = deepmerge(DefaultOptions, options);
  }
}
