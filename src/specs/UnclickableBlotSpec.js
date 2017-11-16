// @flow

import BlotSpec from './BlotSpec';
import BlotResize from '../BlotResize';

const MOUSE_ENTER_ATTRIBUTE = 'data-blot-resize-unclickable-bound';
const PROXY_IMAGE_CLASS = 'blot-resize__proxy-image';

export default class UnclickableBlotSpec extends BlotSpec {
  selector: string;
  unclickable: ?HTMLElement;
  nextUnclickable: ?HTMLElement;
  proxyImage: HTMLImageElement;

  constructor(resizer: BlotResize, selector: string) {
    super(resizer);
    this.selector = selector;
    this.unclickable = null;
    this.nextUnclickable = null;
  }

  init() {
    if (document.body) {
      document.body.appendChild(this.createProxyImage());
    }

    this.hideProxyImage();
    this.proxyImage.addEventListener('click', this.onProxyImageClick);
    this.resizer.quill.on('text-change', this.onTextChange);
  }

  getTargetElement(): ?HTMLElement {
    return this.unclickable;
  }

  getOverlayTarget(): ?HTMLElement {
    return this.unclickable;
  }

  onHide() {
    this.hideProxyImage();
    this.nextUnclickable = null;
    this.unclickable = null;
  }

  // eslint-disable-next-line class-methods-use-this
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

  addMouseEnterListener(element: HTMLElement) {
    element.addEventListener('mouseenter', this.onMouseEnter);
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
        this.addMouseEnterListener(unclickable);
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
    this.resizer.show(this);
    this.hideProxyImage();
  };
}
