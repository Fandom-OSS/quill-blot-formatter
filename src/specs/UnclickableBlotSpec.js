// @flow

import BlotSpec from './BlotSpec';
import BlotResize from '../BlotResize';
import type { Aligner } from '../actions/align/Aligner';
import AlignAction from '../actions/align/AlignAction';
import ImageSpec from './ImageSpec';

const PROXY_IMAGE_CLASS = 'blot-resize__proxy-image';

export default class UnclickableBlotSpec extends BlotSpec {
  selector: string;
  proxyImageObserver: MutationObserver;
  proxyIdAttribute: string;
  imageSpec: ImageSpec;

  constructor(resizer: BlotResize, selector: string) {
    super(resizer);
    this.selector = selector;
    this.proxyIdAttribute = `data-blot-resize-${selector.replace(/[^0-9a-z-]/g, '-')}`;
  }

  init() {
    for (const spec of this.resizer.specs) {
      if (spec instanceof ImageSpec) {
        this.imageSpec = spec;
        break;
      }
    }

    if (!this.imageSpec) {
      console.error('no image spec - unclickables will not work!');
      return;
    }

    this.proxyImageObserver = new MutationObserver(this.onProxyImageMutations);
    this.resizer.quill.on('text-change', this.onTextChange);
  }

  // eslint-disable-next-line class-methods-use-this
  getTargetElement(): ?HTMLElement {
    throw Error('you must extend UnclickableBlotSpec');
  }

  // eslint-disable-next-line class-methods-use-this
  getOverlayTarget(): ?HTMLElement {
    throw Error('you must extend UnclickableBlotSpec');
  }

  // eslint-disable-next-line class-methods-use-this
  onHide() {
    throw Error('you must extend UnclickableBlotSpec');
  }

  getUnclickableForProxyImage(proxyImage: HTMLElement): ?HTMLElement {
    const proxyId = proxyImage.getAttribute(this.proxyIdAttribute);
    if (!proxyId) {
      return null;
    }

    return document.querySelector(`${this.selector}[${this.proxyIdAttribute}="${proxyId}"]`);
  }

  getOrCreateProxyImageForUnclickable(unclickable: HTMLElement): ?HTMLElement {
    const proxyId = unclickable.getAttribute(this.proxyIdAttribute);
    if (!proxyId) {
      console.error('unable to get or create proxy image - missing attribute', this.proxyIdAttribute);
      return null;
    }

    const existing = document.querySelector(`img[${this.proxyIdAttribute}="${proxyId}"]`);
    if (existing) {
      return existing;
    }

    const rect = unclickable.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.globalAlpha = 0;
    context.fillRect(0, 0, rect.width, rect.height);

    const proxyImage = document.createElement('img');

    proxyImage.src = canvas.toDataURL('image/png');
    proxyImage.classList.add(PROXY_IMAGE_CLASS);
    proxyImage.setAttribute(this.proxyIdAttribute, proxyId);

    return proxyImage;
  }

  getAligner(): ?Aligner {
    let aligner: ?Aligner = null;
    for (const action of this.resizer.actions) {
      if (action instanceof AlignAction) {
        aligner = action.aligner;
        break;
      }
    }

    return aligner;
  }

  removeMouseEnterListener(element: HTMLElement) {
    element.removeEventListener('mouseenter', this.onMouseEnter);
  }

  addMouseEnterListener(element: HTMLElement) {
    element.addEventListener('mouseenter', this.onMouseEnter);
  }

  repositionProxyImage(proxyImage: HTMLElement) {
    const unclickable = this.getUnclickableForProxyImage(proxyImage);
    if (!unclickable) {
      return;
    }

    const rect = unclickable.getBoundingClientRect();
    this.removeMouseEnterListener(unclickable);

    Object.assign(
      proxyImage.style,
      {
        position: 'absolute',
        margin: '0',
        left: `${rect.left + window.pageXOffset}px`,
        top: `${rect.top + window.pageYOffset}px`,
      },
    );

    proxyImage.style.width = `${rect.width}px`; // eslint-disable-line no-param-reassign
    this.addMouseEnterListener(unclickable);
  }

  observe(proxyImage: HTMLElement) {
    this.proxyImageObserver.observe(proxyImage, { attributes: true });
  }

  // eslint-disable-next-line class-methods-use-this
  onProxyImageWidthChange(proxyImage: HTMLElement, unclickable: HTMLElement) {
    const rect = proxyImage.getBoundingClientRect();

    if (unclickable.hasAttribute('width')) {
      unclickable.setAttribute('width', `${rect.width}`);
      unclickable.setAttribute('height', `${rect.height}`);
    } else {
      unclickable.style.width = `${rect.width}px`; // eslint-disable-line no-param-reassign
      unclickable.style.height = `${rect.height}px`; // eslint-disable-line no-param-reassign
    }
  }

  onProxyImageAlignChange(proxyImage: HTMLElement, unclickable: HTMLElement) {
    const aligner = this.getAligner();
    if (!aligner) {
      return;
    }

    const nextAlignment = aligner.getCurrentAlignment(proxyImage);
    aligner.clear(unclickable);

    if (nextAlignment) {
      nextAlignment.apply(unclickable);
    }

    aligner.clearStyles(proxyImage);
    this.repositionProxyImage(proxyImage);
    this.resizer.repositionOverlay();
  }

  onProxyImageMutations = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      console.log(mutation);
      if (mutation.type !== 'attributes' || !mutation.target) {
        return;
      }

      const proxyImage = mutation.target;
      if (!(proxyImage instanceof HTMLElement)) {
        return;
      }

      const unclickable = this.getUnclickableForProxyImage(proxyImage);
      if (!unclickable) {
        return;
      }

      this.proxyImageObserver.disconnect();
      if (mutation.attributeName === 'style') {
        this.onProxyImageWidthChange(proxyImage, unclickable);
      } else if (mutation.attributeName === this.resizer.options.align.attribute) {
        this.onProxyImageAlignChange(proxyImage, unclickable);
      }

      this.repositionProxyImage(proxyImage);
      this.observe(proxyImage);
    });
  };

  onTextChange = () => {
    const unclickables = Array.from(document.querySelectorAll(this.selector));
    let needsReindex = false;

    for (const unclickable of unclickables) {
      if (!unclickable.hasAttribute(this.proxyIdAttribute)) {
        needsReindex = true;
        break;
      }
    }

    if (needsReindex) {
      unclickables.forEach((unclickable, index) => {
        this.removeMouseEnterListener(unclickable);
        unclickable.setAttribute(this.proxyIdAttribute, `${index}`);
        this.addMouseEnterListener(unclickable);
      });
    }
  };

  onMouseEnter = (event: MouseEvent) => {
    const unclickable = event.target;
    if (!(unclickable instanceof HTMLElement)) {
      return;
    }

    const proxyImage = this.getOrCreateProxyImageForUnclickable(unclickable);
    if (!proxyImage) {
      return;
    }

    const documentBody = document.body;
    if (!documentBody) {
      return;
    }

    this.repositionProxyImage(proxyImage);
    documentBody.appendChild(proxyImage);
    this.observe(proxyImage);

    proxyImage.addEventListener('click', this.imageSpec.onClick);
  }
}
