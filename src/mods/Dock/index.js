import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import {isWeex} from 'universal-env';
import AppItem from '../AppItem';
import styles from './style.css';

class Dock extends Component {
  state = {
    apps: []
  }

  componentWillMount() {
    if (isWeex) {
      const PkgManager = require('@weex-module/PackageManager');
      const data = PkgManager.getApps('all');

      if (data && data.length) {
        const apps = [];
        data.map((app) => {
          // if (app.appName === '相机') {
          //   console.log('xiangjk');
          // }

        });
        this.setState({
          apps: data
        });
      }
    }
  }

  render() {
    const {apps} = this.state;

    return (
      <View style={styles.container}>
        {apps.map((app) => {
          <Text>app.appName</Text>
        })}
      </View>
    );
  }
}

export default Dock;
