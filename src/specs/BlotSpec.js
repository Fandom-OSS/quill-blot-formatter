// @flow

export interface BlotSpec {
  static canHandle(el: HTMLElement): boolean;
  static create(el: HTMLElement): BlotSpec;

  getResizeTarget(): HTMLElement;
  getOverlayTarget(): HTMLElement;
}
