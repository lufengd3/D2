import {observable, autorun, action} from 'mobx';
import {isWeex} from 'universal-env';

class ObservableContainerStore {
  width = 750;
  @observable height = screen.height * (750 / screen.width);

  constructor() {
    autorun(() => {
      console.log('container height: ' + this.height);
    });
  }

  @action
  updateSize() {
    if (isWeex) {
      const dom = require('@weex-module/dom');
      dom.getComponentRect('viewport', (e) => {
        if (e && e.size && e.size.height) {
          this.height = parseInt(e.size.height);
        }
      });
    }
  }
}

const containerStore = new ObservableContainerStore();

export default containerStore;