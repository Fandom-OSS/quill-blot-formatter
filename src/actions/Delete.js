// @flow

import Quill from 'quill';
import Action from './Action';

export default class Delete extends Action {
  onCreate() {
    document.addEventListener('keyup', this.onKeyUp, true);
    this.resizer.quill.root.addEventListener('input', this.onKeyUp, true);
  }

  onDestroy() {
    document.removeEventListener('keyup', this.onKeyUp);
    this.resizer.quill.root.removeEventListener('input', this.onKeyUp);
  }

  onKeyUp = (e: KeyboardEvent) => {
    if (!this.resizer.currentSpec) {
      return;
    }

    // delete or backspace
    if (e.keyCode === 46 || e.keyCode === 8) {
      const blot = Quill.find(this.resizer.currentSpec.getTargetElement());
      if (blot) {
        blot.deleteAt(0);
      }
      this.resizer.hide();
    }
  };
}
