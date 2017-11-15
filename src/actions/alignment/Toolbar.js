// @flow

import { Aligner } from './Aligner';
import BlotResize from '../../BlotResize';

export interface Toolbar {
  create(resizer: BlotResize, alignmentHelper: Aligner): HTMLElement;
  destroy(): void;
  getElement(): ?HTMLElement;
}
