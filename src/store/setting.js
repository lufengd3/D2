import {observable, action} from 'mobx';

class ObservableSettingStore {

  @action
  toggle() {
  }
}

const settingStore = new ObservableSettingStore();

export default settingStore;