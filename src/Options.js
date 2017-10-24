// @flow

import Module from './modules/Module';
import Toolbar from './modules/Toolbar';

export type BlotResizeOptions = {
  modules?: Module[],
  overlay?: {
    className?: string,
    styled?: boolean,
    styles?: {}
  }
};

const DefaultOptions:BlotResizeOptions = {
  modules: [
    Toolbar,
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
