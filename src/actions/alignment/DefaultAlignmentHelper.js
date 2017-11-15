// @flow

import Quill from 'quill';
import AlignmentHelper from './AlignmentHelper';
import type { Alignment } from './Alignment';

const Parchment = Quill.imports.parchment;
export const ALIGN_ATTRIBUTE = 'data-align';
export const DEFAULT_ALIGNMENTS = {
  left: 'left',
  center: 'center',
  right: 'right',
};

export default class DefaultAlignmentHelper implements AlignmentHelper {
  alignments: { [string]: Alignment };
  floatStyle: any;
  marginStyle: any;
  displayStyle: any;
  alignAttribute: any;
  manageStyle: boolean;

  constructor(setStyle: boolean = true) {
    this.manageStyle = setStyle;
    this.floatStyle = new Parchment.Attributor.Style('float', 'float');
    this.marginStyle = new Parchment.Attributor.Style('margin', 'margin');
    this.displayStyle = new Parchment.Attributor.Style('display', 'display');
    this.alignAttribute = new Parchment.Attributor.Attribute(ALIGN_ATTRIBUTE, ALIGN_ATTRIBUTE);
    this.alignments = {
      [DEFAULT_ALIGNMENTS.left]: {
        icon: '',
        apply: (el: HTMLElement) => {
          this.setAlignment(el, DEFAULT_ALIGNMENTS.left);
          this.setStyle(el, 'inline', 'left', '0 1em 1em 0');
        },
        isApplied: (el: HTMLElement) => this.isAligned(el, DEFAULT_ALIGNMENTS.left),
      },
      [DEFAULT_ALIGNMENTS.center]: {
        icon: '',
        apply: (el: HTMLElement) => {
          this.setAlignment(el, DEFAULT_ALIGNMENTS.center);
          this.setStyle(el, 'block', null, 'auto');
        },
        isApplied: (el: HTMLElement) => this.isAligned(el, DEFAULT_ALIGNMENTS.center),
      },
      [DEFAULT_ALIGNMENTS.right]: {
        icon: '',
        apply: (el: HTMLElement) => {
          this.setAlignment(el, DEFAULT_ALIGNMENTS.right);
          this.setStyle(el, 'inline', 'right', '0 0 1em 1em');
        },
        isApplied: (el: HTMLElement) => this.isAligned(el, DEFAULT_ALIGNMENTS.right),
      },
    };
  }

  getAlignments(): Alignment[] {
    return Object.keys(this.alignments).map(k => this.alignments[k]);
  }

  getCurrentAlignment(el: HTMLElement): ?Alignment {
    let alignment = null;

    this.getAlignments().forEach((candidate: Alignment) => {
      if (alignment !== null) {
        return;
      }

      if (candidate.isApplied(el)) {
        alignment = candidate;
      }
    });

    return alignment;
  }

  clear(el: HTMLElement): void {
    this.alignAttribute.remove(el);

    if (this.manageStyle) {
      this.floatStyle.remove(el);
      this.displayStyle.remove(el);
      this.marginStyle.remove(el);
    }
  }

  setAlignment(el: HTMLElement, value: string) {
    this.alignAttribute.add(el, value);
  }

  setStyle(el: HTMLElement, display: string, float: ?string, margin: string) {
    if (this.manageStyle) {
      this.displayStyle.add(el, display);
      this.marginStyle.add(el, margin);

      if (float) {
        this.floatStyle.add(el, float);
      } else {
        this.floatStyle.remove(el);
      }
    }
  }

  isAligned(el: HTMLElement, alignment: string): boolean {
    return this.alignAttribute.value(el) === alignment;
  }
}
