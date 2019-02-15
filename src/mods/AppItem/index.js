import {createElement, Component} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import styles from './style.css';

class Mod extends Component {

  launch = () => {
    const {data} = this.props;

    const PkgManager = require('@weex-module/PackageManager');
    PkgManager.runApp(data.packageName);
  }

  showAppMenu = () => {
    const {data} = this.props;

    this.uninstallApp(data.packageName);

    // const modal = require('@weex-module/modal');
    // modal.confirm({
    //     message: `卸载 ${data.appName} ?`,
    // }, (value) => {
    //     if (value.toLowerCase() === 'ok') {
    //       this.uninstallApp(data.packageName);
    //     }
    // });
  }

  uninstallApp = (packageName) => {
    const PkgManager = require('@weex-module/PackageManager');
    PkgManager.uninstallApp(packageName);
  }

  render() {
    const {data} = this.props;

    if (!data || !data.appName) {
      return null;
    }

    // source={{uri: 'http://img11.360buyimg.com/n7/jfs/t1/29098/8/6781/96596/5c629972E533ca008/d0c93d8b0f1c11d1.jpg'}} style={{width: 200, height: 200}}
    return (
      <Touchable style={styles.container} onPress={this.launch} onLongPress={this.showAppMenu}>
        <appicon name={data.packageName} style={styles.appicon} />
        <Text style={styles.appName} numberOfLines={1}>{data.appName}</Text>
      </Touchable>
    );
  }
}

export default Mod;