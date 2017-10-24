import Module from './Module';

export default class Toolbar extends Module {
  onCreate() {
    this.toolbar = 'test';
    console.log(this.toolbar);
  }
}
