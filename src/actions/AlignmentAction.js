// @flow

import Action from './Action';
import BlotResize from '../BlotResize';
import { AlignmentHelper, DefaultAlignmentHelper } from '../AlignmentHelper';

export default class AlignmentAction extends Action {
  toolbar: any;
  alignmentHelper: AlignmentHelper;

  constructor(resizer: BlotResize) {
    super(resizer);
    this.alignmentHelper = new DefaultAlignmentHelper();
  }

  onCreate() {
    this.toolbar = 'test';
    console.log(this.toolbar);
  }
}
