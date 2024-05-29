// @flow

import type { Aligner } from './Aligner';
import type BlotFormatter from '../../BlotFormatter';

export interface Toolbar {
  create(formatter: BlotFormatter, alignmentHelper: Aligner): HTMLElement;
  destroy(): void;
  getElement(): ?HTMLElement;
}
