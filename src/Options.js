// @flow

import Action from './actions/Action';
import AlignmentAction from './actions/AlignmentAction';
import DeleteAction from './actions/DeleteAction';
import BlotSpec from './specs/BlotSpec';
import ImageSpec from './specs/ImageSpec';

export type BlotResizeOptions = {
  actions: Class<Action>[],
  specs: Class<BlotSpec>[],
  overlay: {
    className: string,
    styled: boolean,
    styles: {}
  }
};

const DefaultOptions:BlotResizeOptions = {
  actions: [
    AlignmentAction,
    DeleteAction,
  ],
  specs: [
    ImageSpec,
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
