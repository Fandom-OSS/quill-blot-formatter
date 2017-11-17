// @flow

import { Toolbar } from './Toolbar';
import { Aligner } from './Aligner';
import type { Alignment } from './Alignment';
import BlotFormatter from '../../BlotFormatter';

export default class DefaultToolbar implements Toolbar {
  toolbar: ?HTMLElement;
  buttons: HTMLElement[];

  constructor() {
    this.toolbar = null;
    this.buttons = [];
  }

  create(formatter: BlotFormatter, aligner: Aligner): HTMLElement {
    const toolbar = document.createElement('div');
    toolbar.classList.add('blot-formatter__toolbar');
    this.addToolbarStyle(formatter, toolbar);
    this.addButtons(formatter, toolbar, aligner);

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
  addToolbarStyle(formatter: BlotFormatter, toolbar: HTMLElement) {
    if (formatter.options.align.toolbar.mainStyle) {
      Object.assign(toolbar.style, formatter.options.align.toolbar.mainStyle);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  addButtonStyle(button: HTMLElement, index: number, formatter: BlotFormatter) {
    if (formatter.options.align.toolbar.buttonStyle) {
      Object.assign(button.style, formatter.options.align.toolbar.buttonStyle);
      if (index > 0) {
        button.style.borderLeftWidth = '0'; // eslint-disable-line no-param-reassign
      }
    }

    if (formatter.options.align.toolbar.svgStyle) {
      Object.assign(button.children[0].style, formatter.options.align.toolbar.svgStyle);
    }
  }

  addButtons(formatter: BlotFormatter, toolbar: HTMLElement, aligner: Aligner) {
    aligner.getAlignments().forEach((alignment, i) => {
      const button = document.createElement('span');
      button.classList.add('blot-formatter__toolbar-button');
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        this.onButtonClick(button, formatter, alignment, aligner);
      });
      this.preselectButton(button, alignment, formatter, aligner);
      this.addButtonStyle(button, i, formatter);
      this.buttons.push(button);
      toolbar.appendChild(button);
    });
  }

  preselectButton(
    button: HTMLElement,
    alignment: Alignment,
    formatter: BlotFormatter,
    aligner: Aligner,
  ) {
    if (!formatter.currentSpec) {
      return;
    }

    const target = formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    if (aligner.isAligned(target, alignment)) {
      this.selectButton(button);
    }
  }

  onButtonClick(
    button: HTMLElement,
    formatter: BlotFormatter,
    alignment: Alignment,
    aligner: Aligner,
  ) {
    if (!formatter.currentSpec) {
      return;
    }

    const target = formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }

    this.clickButton(button, target, formatter, alignment, aligner);
  }

  clickButton(
    button: HTMLElement,
    resizeTarget: HTMLElement,
    formatter: BlotFormatter,
    alignment: Alignment,
    aligner: Aligner,
  ) {
    this.buttons.forEach(this.deselectButton);
    if (aligner.isAligned(resizeTarget, alignment)) {
      if (formatter.options.align.toolbar.allowDeselect) {
        aligner.clear(resizeTarget);
      } else {
        this.selectButton(button);
      }
    } else {
      this.selectButton(button);
      alignment.apply(resizeTarget);
    }

    formatter.update();
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
