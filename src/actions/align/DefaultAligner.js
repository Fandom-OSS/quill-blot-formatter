// @flow

import Quill from 'quill';
import { Aligner } from './Aligner';
import type { Alignment } from './Alignment';
import type { AlignOptions } from '../../Options';

const Parchment = Quill.imports.parchment;
const LEFT_ALIGN = 'left';
const CENTER_ALIGN = 'center';
const RIGHT_ALIGN = 'right';

export default class DefaultAligner implements Aligner {
  alignments: { [string]: Alignment };
  floatStyle: any;
  marginStyle: any;
  displayStyle: any;
  alignAttribute: any;
  applyStyle: boolean;

  constructor(options: AlignOptions) {
    this.applyStyle = options.aligner.applyStyle;
    this.floatStyle = new Parchment.Attributor.Style('float', 'float');
    this.marginStyle = new Parchment.Attributor.Style('margin', 'margin');
    this.displayStyle = new Parchment.Attributor.Style('display', 'display');
    this.alignAttribute = new Parchment.Attributor.Attribute(options.attribute, options.attribute);
    this.alignments = {
      [LEFT_ALIGN]: {
        name: LEFT_ALIGN,
        icon: options.icons.left,
        apply: (el: HTMLElement) => {
          this.setAlignment(el, LEFT_ALIGN);
          this.setStyle(el, 'inline', 'left', '0 1em 1em 0');
        },
      },
      [CENTER_ALIGN]: {
        name: CENTER_ALIGN,
        icon: options.icons.center,
        apply: (el: HTMLElement) => {
          this.setAlignment(el, CENTER_ALIGN);
          this.setStyle(el, 'block', null, 'auto');
        },
      },
      [RIGHT_ALIGN]: {
        name: RIGHT_ALIGN,
        icon: options.icons.right,
        apply: (el: HTMLElement) => {
          this.setAlignment(el, RIGHT_ALIGN);
          this.setStyle(el, 'inline', 'right', '0 0 1em 1em');
        },
      },
    };
  }

  getAlignments(): Alignment[] {
    return Object.keys(this.alignments).map(k => this.alignments[k]);
  }

  clear(el: HTMLElement): void {
    this.alignAttribute.remove(el);
    if (this.applyStyle) {
      this.floatStyle.remove(el);
      this.displayStyle.remove(el);
      this.marginStyle.remove(el);
    }
  }

  isAligned(el: HTMLElement, alignment: Alignment): boolean {
    return this.alignAttribute.value(el) === alignment.name;
  }

  setAlignment(el: HTMLElement, value: string) {
    this.alignAttribute.add(el, value);
  }

  setStyle(el: HTMLElement, display: string, float: ?string, margin: string) {
    if (this.applyStyle) {
      this.displayStyle.add(el, display);
      this.marginStyle.add(el, margin);

      if (float) {
        this.floatStyle.add(el, float);
      } else {
        this.floatStyle.remove(el);
      }
    }
  }
}
