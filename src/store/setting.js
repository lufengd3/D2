import {observable, action} from 'mobx';
import AsyncStorage from 'universal-asyncstorage';

function handleError(e) {
  console.error(e);
}

class ObservableSettingStore {
  @observable warningModeStartTime = '00:00';
  @observable warningModeEndTime = '06:00';

  constructor() {
    this.readWarningModeConfig();
  }

  readWarningModeConfig() {
    AsyncStorage.getItem('warningModeStartTime')
      .then(e => {
        if (e) {
          this.warningModeEndTime = e;
        }
      })
      .catch(handleError);
    
    AsyncStorage.getItem('warningModeEndTime')
      .then(e => {
        if (e) {
          this.warningModeEndTime = e;
        }
      })
      .catch(handleError);
  }

  @action
  update(key, value) {
    this[key] = value;

    AsyncStorage.setItem(key, value).catch(handleError);
  }
}

const settingStore = new ObservableSettingStore();

export default settingStore;