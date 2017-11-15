// @flow

import type { Alignment } from './Alignment';

export interface Aligner {
  getAlignments(): Alignment[];
  getCurrentAlignment(el: HTMLElement): ?Alignment;
  clear(el: HTMLElement): void;
}
