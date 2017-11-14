// @flow

export interface BlotSpec {
  static canHandle(el: HTMLElement): boolean;
  static create(el: HTMLElement): BlotSpec;

  getTargetElement(): HTMLElement;
  getOverlayTarget(): HTMLElement;
}
