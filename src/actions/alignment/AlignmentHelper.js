// @flow

import type { Alignment } from './Alignment';

export interface AlignmentHelper {
  getAlignments(): Alignment[];
  getCurrentAlignment(el: HTMLElement): ?Alignment;
  clear(el: HTMLElement): void;
}
