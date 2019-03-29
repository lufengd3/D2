import {observable, action} from 'mobx';

class ObservableSystemStore {
  @observable hardwareStatus = {};

  constructor() {
    this.updateHardwareStatus();
  }

  @action
  updateHardwareStatus() {
    const SystemStatus = require('@weex-module/SystemStatus');
    this.hardwareStatus = SystemStatus.getHardwareStatus();
  }

}

const systemtStore = new ObservableSystemStore();

export default systemtStore;