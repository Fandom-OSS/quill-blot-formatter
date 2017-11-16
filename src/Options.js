// @flow

import Action from './actions/Action';
import AlignAction from './actions/align/AlignAction';
import ResizeAction from './actions/ResizeAction';
import DeleteAction from './actions/DeleteAction';
import BlotSpec from './specs/BlotSpec';
import ImageSpec from './specs/ImageSpec';

export type BlotResizeOptions = {
  actions: Class<Action>[],
  specs: Class<BlotSpec>[],
  overlay: {
    styles: ?{},
  },
  toolbar: {
    allowDeselect: boolean,
    mainStyle: ?{},
    buttonStyle: ?{},
    svgStyle: ?{},
  },
  resize: {
    handleStyle: ?{},
  },
};

const DefaultOptions:BlotResizeOptions = {
  actions: [
    AlignAction,
    ResizeAction,
    DeleteAction,
  ],
  specs: [
    ImageSpec,
  ],
  overlay: {
    styles: {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed #444',
    },
  },
  toolbar: {
    allowDeselect: true,
    mainStyle: {
      position: 'absolute',
      top: '-12px',
      right: '0',
      left: '0',
      height: '0',
      minWidth: '100px',
      font: '12px/1.0 Arial, Helvetica, sans-serif',
      textAlign: 'center',
      color: '#333',
      boxSizing: 'border-box',
      cursor: 'default',
      zIndex: '1',
    },
    buttonStyle: {
      display: 'inline-block',
      width: '24px',
      height: '24px',
      background: 'white',
      border: '1px solid #999',
      verticalAlign: 'middle',
    },
    svgStyle: {
      display: 'inline-block',
      width: '24px',
      height: '24px',
      background: 'white',
      border: '1px solid #999',
      verticalAlign: 'middle',
    },
  },
  resize: {
    handleStyle: {
      position: 'absolute',
      height: '12px',
      width: '12px',
      backgroundColor: 'white',
      border: '1px solid #777',
      boxSizing: 'border-box',
      opacity: '0.80',
    },
  },
};

export default DefaultOptions;
