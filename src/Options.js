// @flow

import typeof Action from './actions/Action';
import Alignment from './actions/Alignment';
import BlotSpec from './specs/BlotSpec';
import ImageSpec from './specs/ImageSpec';

export type BlotResizeOptions = {
  actions: Action[],
  specs: BlotSpec[],
  overlay: {
    className: string,
    styled: boolean,
    styles: {}
  }
};

const DefaultOptions:BlotResizeOptions = {
  actions: [
    Alignment,
  ],
  specs: [
    new ImageSpec(),
  ],
  overlay: {
    className: 'blot-resize__overlay',
    styled: true,
    styles: {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed #444',
    },
  },
};

export default DefaultOptions;
