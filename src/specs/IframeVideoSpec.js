// @flow

import UnclickableBlotSpec from './UnclickableBlotSpec';
import BlotResize from '../BlotResize';

export default class IframeVideoSpec extends UnclickableBlotSpec {
  constructor(resizer: BlotResize) {
    super(resizer, 'iframe.ql-video');
  }
}
