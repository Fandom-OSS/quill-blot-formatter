// @flow

import UnclickableBlotSpec from './UnclickableBlotSpec';
import type BlotFormatter from '../BlotFormatter';

export default class IframeVideoSpec extends UnclickableBlotSpec {
  constructor(formatter: BlotFormatter) {
    super(formatter, 'iframe.ql-video');
  }
}
