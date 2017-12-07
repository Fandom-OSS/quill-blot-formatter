// @flow

import BlotSpec from './BlotSpec';
import BlotFormatter from '../BlotFormatter';

const MOUSE_ENTER_ATTRIBUTE = 'data-blot-formatter-unclickable-bound';
const PROXY_IMAGE_CLASS = 'blot-formatter__proxy-image';

export default class UnclickableBlotSpec extends BlotSpec {
  selector: string;
  unclickable: ?HTMLElement;
  nextUnclickable: ?HTMLElement;
  proxyImage: HTMLImageElement;

  constructor(formatter: BlotFormatter, selector: string) {
    super(formatter);
    this.selector = selector;
    this.unclickable = null;
    this.nextUnclickable = null;
  }

  init() {
    if (document.body) {
      /*
      it's important that this is attached to the body instead of the root quill element.
      this prevents the click event from overlapping with ImageSpec
       */
      document.body.appendChild(this.createProxyImage());
    }

    this.hideProxyImage();
    this.proxyImage.addEventListener('click', this.onProxyImageClick);
    this.formatter.quill.on('text-change', this.onTextChange);
  }

  getTargetElement(): ?HTMLElement {
    return this.unclickable;
  }

  getOverlayElement(): ?HTMLElement {
    return this.unclickable;
  }

  onHide() {
    this.hideProxyImage();
    this.nextUnclickable = null;
    this.unclickable = null;
  }

  createProxyImage(): HTMLElement {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.globalAlpha = 0;
    context.fillRect(0, 0, 1, 1);

    this.proxyImage = document.createElement('img');
    this.proxyImage.src = canvas.toDataURL('image/png');
    this.proxyImage.classList.add(PROXY_IMAGE_CLASS);

    Object.assign(this.proxyImage.style, {
      position: 'absolute',
      margin: '0',
    });

    return this.proxyImage;
  }

  hideProxyImage() {
    Object.assign(this.proxyImage.style, {
      display: 'none',
    });
  }

  repositionProxyImage(unclickable: HTMLElement) {
    const rect = unclickable.getBoundingClientRect();

    Object.assign(
      this.proxyImage.style,
      {
        display: 'block',
        left: `${rect.left + window.pageXOffset}px`,
        top: `${rect.top + window.pageYOffset}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      },
    );
  }

  onTextChange = () => {
    Array.from(document.querySelectorAll(`${this.selector}:not([${MOUSE_ENTER_ATTRIBUTE}])`))
      .forEach((unclickable) => {
        unclickable.setAttribute(MOUSE_ENTER_ATTRIBUTE, 'true');
        unclickable.addEventListener('mouseenter', this.onMouseEnter);
      });
  };

  onMouseEnter = (event: MouseEvent) => {
    const unclickable = event.target;
    if (!(unclickable instanceof HTMLElement)) {
      return;
    }

    this.nextUnclickable = unclickable;
    this.repositionProxyImage(this.nextUnclickable);
  }

  onProxyImageClick = () => {
    this.unclickable = this.nextUnclickable;
    this.nextUnclickable = null;
    this.formatter.show(this);
    this.hideProxyImage();
  };
}
