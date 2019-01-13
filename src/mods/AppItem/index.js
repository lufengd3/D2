import {createElement, Component} from 'rax';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import styles from './style.css';

class Mod extends Component {

  launch = () => {
    const {data} = this.props;

    const PkgManager = require('@weex-module/PackageManager');
    PkgManager.runApp(data.packageName);
  }

  render() {
    const {data} = this.props;

    if (!data || !data.appName) {
      return null;
    }

    return (
      <Touchable style={styles.container} onPress={this.launch}>
        <Text style={styles.appName}>{data.appName}</Text>
      </Touchable>
    );
  }
}

export default Mod;
