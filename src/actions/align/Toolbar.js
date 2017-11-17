// @flow

import { Aligner } from './Aligner';
import BlotFormatter from '../../BlotFormatter';

export interface Toolbar {
  create(formatter: BlotFormatter, alignmentHelper: Aligner): HTMLElement;
  destroy(): void;
  getElement(): ?HTMLElement;
}
