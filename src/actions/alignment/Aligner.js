// @flow

import type { Alignment } from './Alignment';

export interface Aligner {
  getAlignments(): Alignment[];
  getCurrentAlignment(el: HTMLElement): ?Alignment;
  isAligned(el: HTMLElement, alignment: Alignment): boolean;
  clear(el: HTMLElement): void;
}
