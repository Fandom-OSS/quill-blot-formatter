// @flow

import Action from '../Action';
import BlotResize from '../../BlotResize';
import DefaultAlignmentHelper from './DefaultAlignmentHelper';
import { AlignmentHelper } from './AlignmentHelper';
import { Toolbar } from './Toolbar';
import DefaultToolbar from './DefaultToolbar';

export default class AlignmentAction extends Action {
  toolbar: Toolbar;
  alignmentHelper: AlignmentHelper;

  constructor(resizer: BlotResize) {
    super(resizer);
    this.alignmentHelper = new DefaultAlignmentHelper();
    this.toolbar = new DefaultToolbar();
  }

  onCreate() {
    const toolbar = this.toolbar.create(this.resizer, this.alignmentHelper);
    this.resizer.overlay.appendChild(toolbar);
  }

  onDestroy() {
    const toolbar = this.toolbar.getElement();
    if (!toolbar) {
      return;
    }

    this.resizer.overlay.removeChild(toolbar);
    this.toolbar.destroy();
  }
}
