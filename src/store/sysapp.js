import {observable, action} from 'mobx';

class ObservableSysAppStore {
  @observable isExpanded = false;

  @action
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}

const sysAppStore = new ObservableSysAppStore();

export default sysAppStore;