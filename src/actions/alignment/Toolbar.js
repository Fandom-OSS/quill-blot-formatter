// @flow

import { AlignmentHelper } from './AlignmentHelper';
import BlotResize from '../../BlotResize';

export interface Toolbar {
  create(resizer: BlotResize, alignmentHelper: AlignmentHelper): HTMLElement;
  destroy(): void;
  getElement(): ?HTMLElement;
}
