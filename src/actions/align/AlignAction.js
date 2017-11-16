// @flow

import Action from '../Action';
import BlotResize from '../../BlotResize';
import DefaultAligner from './DefaultAligner';
import { Aligner } from './Aligner';
import { Toolbar } from './Toolbar';
import DefaultToolbar from './DefaultToolbar';

export default class AlignAction extends Action {
  toolbar: Toolbar;
  alignmentHelper: Aligner;

  constructor(resizer: BlotResize) {
    super(resizer);
    this.alignmentHelper = new DefaultAligner(resizer.options.align.aligner.applyStyle);
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
