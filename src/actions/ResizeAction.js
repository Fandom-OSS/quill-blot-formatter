// @flow

import Action from './Action';
import BlotResize from '../BlotResize';

export default class ResizeAction extends Action {
  topLeftHandle: HTMLElement;
  topRightHandle: HTMLElement;
  bottomRightHandle: HTMLElement;
  bottomLeftHandle: HTMLElement;
  dragHandle: ?HTMLElement;
  dragStartX: number;
  preDragWidth: number;
  targetRatio: number;

  constructor(resizer: BlotResize) {
    super(resizer);
    this.topLeftHandle = this.createHandle('top-left', 'nwse-resize', resizer.options.resize.handleStyle);
    this.topRightHandle = this.createHandle('top-right', 'nesw-resize', resizer.options.resize.handleStyle);
    this.bottomRightHandle = this.createHandle('bottom-right', 'nwse-resize', resizer.options.resize.handleStyle);
    this.bottomLeftHandle = this.createHandle('bottom-left', 'nesw-resize', resizer.options.resize.handleStyle);
    this.dragHandle = null;
    this.dragStartX = 0;
    this.preDragWidth = 0;
    this.targetRatio = 0;
  }

  onCreate() {
    this.resizer.overlay.appendChild(this.topLeftHandle);
    this.resizer.overlay.appendChild(this.topRightHandle);
    this.resizer.overlay.appendChild(this.bottomRightHandle);
    this.resizer.overlay.appendChild(this.bottomLeftHandle);

    this.repositionHandles(this.resizer.options.resize.handleStyle);
  }

  onDestroy() {
    this.setCursor('');
    this.resizer.overlay.removeChild(this.topLeftHandle);
    this.resizer.overlay.removeChild(this.topRightHandle);
    this.resizer.overlay.removeChild(this.bottomRightHandle);
    this.resizer.overlay.removeChild(this.bottomLeftHandle);
  }

  createHandle(position: string, cursor: string, handleStyle: ?{}): HTMLElement {
    const box = document.createElement('div');
    box.classList.add(`blot-resize__resize-${position}`);
    box.style.cursor = cursor;

    if (handleStyle) {
      Object.assign(box.style, handleStyle);
    }

    box.addEventListener('mousedown', this.onMouseDown);

    return box;
  }

  repositionHandles(handleStyle: ?{}) {
    let handleXOffset = '0px';
    let handleYOffset = '0px';
    if (handleStyle) {
      if (handleStyle.width) {
        handleXOffset = `${-parseFloat(handleStyle.width) / 2}px`;
      }
      if (handleStyle.height) {
        handleYOffset = `${-parseFloat(handleStyle.height) / 2}px`;
      }
    }

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

    const rect = target.getBoundingClientRect();

    this.dragStartX = event.clientX;
    this.preDragWidth = rect.width;
    this.targetRatio = rect.height / rect.width;

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
    let newWidth = 0;

    if (this.dragHandle === this.topLeftHandle || this.dragHandle === this.bottomLeftHandle) {
      newWidth = Math.round(this.preDragWidth - deltaX);
    } else {
      newWidth = Math.round(this.preDragWidth + deltaX);
    }

    const newHeight = this.targetRatio * newWidth;

    if (target.hasAttribute('width')) {
      target.setAttribute('width', `${newWidth}`);
      target.setAttribute('height', `${newHeight}`);
    } else {
      target.style.width = `${newWidth}px`;
      target.style.height = `${newHeight}px`;
    }

    this.resizer.update();
  };

  onMouseUp = () => {
    this.setCursor('');
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
