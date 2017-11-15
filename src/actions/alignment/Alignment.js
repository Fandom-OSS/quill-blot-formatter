// @flow

export type Alignment = {
  icon: string;
  apply: (el: HTMLElement) => void;
  isApplied: (el: HTMLElement) => boolean;
}
