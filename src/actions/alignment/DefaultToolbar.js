// @flow

import Toolbar from './Toolbar';
import { AlignmentHelper } from './AlignmentHelper';
import type { Alignment } from './Alignment';
import BlotResize from '../../BlotResize';

const toolbarStyle = {
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
};

const buttonStyle = {
  display: 'inline-block',
  width: '24px',
  height: '24px',
  background: 'white',
  border: '1px solid #999',
  verticalAlign: 'middle',
};

export default class DefaultToolbar implements Toolbar {
  toolbar: ?HTMLElement;
  buttons: HTMLElement[];

  constructor() {
    this.toolbar = null;
    this.buttons = [];
  }

  create(resizer: BlotResize, alignmentHelper: AlignmentHelper): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.classList.add('blot-resize__toolbar');
    this.addToolbarStyle(toolbar);
    this.addButtons(resizer, toolbar, alignmentHelper);

    this.toolbar = toolbar;
    return this.toolbar;
  }

  destroy() {
    this.toolbar = null;
    this.buttons = [];
  }

  getElement() {
    return this.toolbar;
  }

  // eslint-disable-next-line class-methods-use-this
  addToolbarStyle(toolbar: HTMLElement) {
    Object.assign(toolbar.style, toolbarStyle);
  }

  // eslint-disable-next-line class-methods-use-this
  addButtonStyle(button: HTMLElement, index: number) {
    Object.assign(button.style, buttonStyle);
    if (index > 0) {
      button.style.borderLeftWidth = '0'; // eslint-disable-line no-param-reassign
    }
    Object.assign(button.children[0].style, buttonStyle);
  }

  addButtons(resizer: BlotResize, toolbar: HTMLElement, alignmentHelper: AlignmentHelper) {
    alignmentHelper.getAlignments().forEach((alignment, i) => {
      const button = document.createElement('span');
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        this.onButtonClick(button, resizer, alignment, alignmentHelper);
      });
      this.addButtonStyle(button, i);
      this.buttons.push(button);
      toolbar.appendChild(button);
    });
  }

  onButtonClick(
    button: HTMLElement,
    resizer: BlotResize,
    alignment: Alignment,
    alignmentHelper: AlignmentHelper,
  ) {
    if (!resizer.currentSpec) {
      return;
    }

    const target = resizer.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    this.clickButton(button, target, resizer, alignment, alignmentHelper);
  }

  clickButton(
    button: HTMLElement,
    resizeTarget: HTMLElement,
    resizer: BlotResize,
    alignment: Alignment,
    alignmentHelper: AlignmentHelper,
  ) {
    this.buttons.forEach(this.deselectButton);
    if (alignment.isApplied(resizeTarget)) {
      // TODO: account for case where users can't deselect an alignment
      alignmentHelper.clear(resizeTarget);
    } else {
      this.selectButton(button);
      alignment.apply(resizeTarget);
    }

    resizer.update();
  }

  // eslint-disable-next-line class-methods-use-this
  selectButton(button: HTMLElement) {
    button.style.filter = 'invert(20%)'; // eslint-disable-line no-param-reassign
  }

  // eslint-disable-next-line class-methods-use-this
  deselectButton(button: HTMLElement) {
    button.style.filter = ''; // eslint-disable-line no-param-reassign
  }
}
