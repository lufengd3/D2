import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Touchable from 'rax-touchable';
import Image from 'rax-image';
import AppItem from '../AppItem';
import styles from './style.css';
import {inject, observer} from 'mobx-rax';

const REFRESH_ICON = 'http://pozkwhz9d.bkt.clouddn.com/refresh-128-2.png';

@inject('appsStore')
@observer
class GuessApp extends Component {

  handlePress = () => {
    const permissionManager = require('@weex-module/PermissionManager');
    const granted = permissionManager.checkUsagePermission();

    if (!granted) {
      permissionManager.requestUsagePermission();
    }
  }

  render() {
    const {appsStore} = this.props;
    const {importantApps} = appsStore;

    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>常用的应用</Text>
          {importantApps.length ? null : <Touchable onPress={this.handlePress}>
            <Image source={{uri: REFRESH_ICON}} style={styles.refreshIcon} />
          </Touchable>}
        </View>
        <View style={styles.appItemContainer}>
          {importantApps.map((appInfo) => {
            return <AppItem data={appInfo} />
          })}
        </View>
      </View>

    );
  }
}

export default GuessApp;
