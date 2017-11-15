// @flow

const handleStyle = {
  position: 'absolute',
  height: '12px',
  width: '12px',
  backgroundColor: 'white',
  border: '1px solid #777',
  boxSizing: 'border-box',
  opacity: '0.80',
};

export default class ResizeHandle {
  manageStyle: boolean;

  constructor(manageStyle: boolean = true) {
    this.manageStyle = manageStyle;
  }

  createHandle(position: string, cursor: string) {
    const box = document.createElement('div');
    box.classList.add(`blot-resize__resize-${position}`);
    box.style.cursor = cursor;

    if (this.manageStyle) {
      Object.assign(box.style, handleStyle);
    }

    return box;
  }
}
