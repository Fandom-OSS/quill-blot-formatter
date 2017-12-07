// @flow

import BlotSpec from './specs/BlotSpec';
import ImageSpec from './specs/ImageSpec';
import IframeVideoSpec from './specs/IframeVideoSpec';

export type OverlayOptions = {
  className: string,
  style: ?{},
};

export type ResizeOptions = {
  handleClassName: string,
  handleStyle: ?{},
};

export type AlignOptions = {
  attribute: string,
  aligner: {
    applyStyle: boolean, // whether or not the aligner should handle the actual alignment properties
  },
  icons: {
    left: string,
    center: string,
    right: string,
  },
  toolbar: {
    allowDeselect: boolean,
    mainClassName: string,
    mainStyle: ?{},
    buttonClassName: string,
    addButtonSelectStyle: boolean,
    buttonStyle: ?{},
    svgStyle: ?{},
  },
};

export type Options = {
  specs: Class<BlotSpec>[],
  overlay: OverlayOptions,
  align: AlignOptions,
  resize: ResizeOptions,
};

const DefaultOptions: Options = {
  specs: [
    ImageSpec,
    IframeVideoSpec,
  ],
  overlay: {
    className: 'blot-formatter__overlay',
    style: {
      position: 'absolute',
      boxSizing: 'border-box',
      border: '1px dashed #444',
    },
  },
  align: {
    attribute: 'data-align',
    aligner: {
      applyStyle: true,
    },
    icons: {
      left: `
        <svg viewbox="0 0 18 18">
          <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>
        </svg>
      `,
      center: `
        <svg viewbox="0 0 18 18">
           <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>
        </svg>
      `,
      right: `
        <svg viewbox="0 0 18 18">
          <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>
          <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>
          <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>
        </svg>
      `,
    },
    toolbar: {
      allowDeselect: true,
      mainClassName: 'blot-formatter__toolbar',
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
      buttonClassName: 'blot-formatter__toolbar-button',
      addButtonSelectStyle: true,
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
  },
  resize: {
    handleClassName: 'blot-formatter__resize-handle',
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
