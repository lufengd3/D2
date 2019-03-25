import {observable, autorun} from 'mobx'

class ObservableContainerStore {
  width = 750;
  @observable height = screen.height * (750 / screen.width);

  constructor() {
    autorun(() => {
      console.log('container height: ' + this.height);
    });
  }
}

const containerStore = new ObservableContainerStore();

export default containerStore;