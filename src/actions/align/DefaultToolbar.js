// @flow

import { Toolbar } from './Toolbar';
import { Aligner } from './Aligner';
import type { Alignment } from './Alignment';
import BlotResize from '../../BlotResize';

export default class DefaultToolbar implements Toolbar {
  toolbar: ?HTMLElement;
  buttons: HTMLElement[];

  constructor() {
    this.toolbar = null;
    this.buttons = [];
  }

  create(resizer: BlotResize, aligner: Aligner): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.classList.add('blot-resize__toolbar');
    this.addToolbarStyle(resizer, toolbar);
    this.addButtons(resizer, toolbar, aligner);

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
  addToolbarStyle(resizer: BlotResize, toolbar: HTMLElement) {
    if (resizer.options.align.toolbar.mainStyle) {
      Object.assign(toolbar.style, resizer.options.align.toolbar.mainStyle);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addButtonStyle(button: HTMLElement, index: number, resizer: BlotResize) {
    if (resizer.options.align.toolbar.buttonStyle) {
      Object.assign(button.style, resizer.options.align.toolbar.buttonStyle);
      if (index > 0) {
        button.style.borderLeftWidth = '0'; // eslint-disable-line no-param-reassign
      }
    }

    if (resizer.options.align.toolbar.svgStyle) {
      Object.assign(button.children[0].style, resizer.options.align.toolbar.svgStyle);
    }
  }

  addButtons(resizer: BlotResize, toolbar: HTMLElement, aligner: Aligner) {
    aligner.getAlignments().forEach((alignment, i) => {
      const button = document.createElement('span');
      button.classList.add('blot-resize__toolbar-button');
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        this.onButtonClick(button, resizer, alignment, aligner);
      });
      this.preselectButton(button, alignment, resizer, aligner);
      this.addButtonStyle(button, i, resizer);
      this.buttons.push(button);
      toolbar.appendChild(button);
    });
  }

  preselectButton(
    button: HTMLElement,
    alignment: Alignment,
    resizer: BlotResize,
    aligner: Aligner,
  ) {
    if (!resizer.currentSpec) {
      return;
    }

    const target = resizer.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    if (aligner.isAligned(target, alignment)) {
      this.selectButton(button);
    }
  }

  onButtonClick(
    button: HTMLElement,
    resizer: BlotResize,
    alignment: Alignment,
    aligner: Aligner,
  ) {
    if (!resizer.currentSpec) {
      return;
    }

    const target = resizer.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    this.clickButton(button, target, resizer, alignment, aligner);
  }

  clickButton(
    button: HTMLElement,
    resizeTarget: HTMLElement,
    resizer: BlotResize,
    alignment: Alignment,
    aligner: Aligner,
  ) {
    this.buttons.forEach(this.deselectButton);
    if (aligner.isAligned(resizeTarget, alignment)) {
      if (resizer.options.align.toolbar.allowDeselect) {
        aligner.clear(resizeTarget);
      } else {
        this.selectButton(button);
      }
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
