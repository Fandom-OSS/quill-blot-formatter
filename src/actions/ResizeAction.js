// @flow

import Action from './Action';
import BlotResize from '../BlotResize';

const handleStyle = {
  position: 'absolute',
  height: '12px',
  width: '12px',
  backgroundColor: 'white',
  border: '1px solid #777',
  boxSizing: 'border-box',
  opacity: '0.80',
};

export default class ResizeAction extends Action {
  topLeftHandle: HTMLElement;
  topRightHandle: HTMLElement;
  bottomRightHandle: HTMLElement;
  bottomLeftHandle: HTMLElement;
  dragHandle: ?HTMLElement;
  dragStartX: number;
  preDragWidth: number;

  constructor(resizer: BlotResize) {
    super(resizer);
    this.topLeftHandle = this.createHandle('top-left', 'nwse-resize');
    this.topRightHandle = this.createHandle('top-right', 'nesw-resize');
    this.bottomRightHandle = this.createHandle('bottom-right', 'nwse-resize');
    this.bottomLeftHandle = this.createHandle('bottom-left', 'nesw-resize');
    this.dragHandle = null;
    this.dragStartX = 0;
    this.preDragWidth = 0;
  }

  onCreate() {
    this.resizer.overlay.appendChild(this.topLeftHandle);
    this.resizer.overlay.appendChild(this.topRightHandle);
    this.resizer.overlay.appendChild(this.bottomRightHandle);
    this.resizer.overlay.appendChild(this.bottomLeftHandle);

    this.repositionHandles();
  }

  onDestroy() {
    this.setCursor('');
    this.resizer.overlay.removeChild(this.topLeftHandle);
    this.resizer.overlay.removeChild(this.topRightHandle);
    this.resizer.overlay.removeChild(this.bottomRightHandle);
    this.resizer.overlay.removeChild(this.bottomLeftHandle);
  }

  createHandle(position: string, cursor: string): HTMLElement {
    const box = document.createElement('div');
    box.classList.add(`blot-resize__resize-${position}`);
    box.style.cursor = cursor;

    Object.assign(box.style, handleStyle);

    box.addEventListener('mousedown', this.onMouseDown);

    return box;
  }

  repositionHandles() {
    const handleXOffset = `${-parseFloat(handleStyle.width) / 2}px`;
    const handleYOffset = `${-parseFloat(handleStyle.height) / 2}px`;

    Object.assign(this.topLeftHandle.style, { left: handleXOffset, top: handleYOffset });
    Object.assign(this.topRightHandle.style, { right: handleXOffset, top: handleYOffset });
    Object.assign(this.bottomRightHandle.style, { right: handleXOffset, bottom: handleYOffset });
    Object.assign(this.bottomLeftHandle.style, { left: handleXOffset, bottom: handleYOffset });
  }

  setCursor(value: string) {
    if (document.body) {
      document.body.style.cursor = value;
    }

    if (this.resizer.currentSpec) {
      const target = this.resizer.currentSpec.getOverlayTarget();
      if (target) {
        target.style.cursor = value;
      }
    }
  }

  onMouseDown = (event: MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    this.dragHandle = event.target;
    this.setCursor(this.dragHandle.style.cursor);

    if (!this.resizer.currentSpec) {
      return;
    }

    const target = this.resizer.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    this.dragStartX = event.clientX;
    this.preDragWidth = target.getBoundingClientRect().width;

    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onDrag = (event: MouseEvent) => {
    if (!this.resizer.currentSpec) {
      return;
    }

    const target = this.resizer.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    const deltaX = event.clientX - this.dragStartX;
    let newWidth: number = 0;
    if (this.dragHandle === this.topLeftHandle || this.dragHandle === this.bottomLeftHandle) {
      newWidth = Math.round(this.preDragWidth - deltaX);
    } else {
      newWidth = Math.round(this.preDragWidth + deltaX);
    }

    target.style.width = `${newWidth}px`;

    this.resizer.update();
  };

  onMouseUp = () => {
    this.setCursor('');
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
