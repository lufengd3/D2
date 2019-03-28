import {createElement, Component, findDOMNode} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';
import Touchable from 'rax-touchable';
import emitter from 'tiny-emitter/instance';
// import {inject, observer} from 'mobx-rax';
import {emitterChannel} from '../../constant';
import styles from './style.css';

const PkgManager = require('@weex-module/PackageManager');

class Mod extends Component {

  state = {
    menuVisable: false,
    menuPosition: {}
  };

  launch = () => {
    const {data, appsStore} = this.props;

    PkgManager.runApp(data.packageName);

    emitter.emit(emitterChannel.APP_LAUNCH);
  }

  showMenu = () => {
    const vibrator = require('@weex-module/vibrator');
    vibrator.run(60);

    const dom = require('@weex-module/dom');
    dom.getComponentRect(findDOMNode(this.refs.itemContainer), (res) => {
      if (res.size) {
        const {left, top} = res.size;
        const menuHeight = styles.menuContainer.height;

        const position = {
          top: top > menuHeight ? top - menuHeight : top + 20
        };
        if (left > 550) {
          position.right = 26;
        } else {
          position.left = left + 26;
        }

        this.setState({
          menuVisable: true,
          menuPosition: position
        });
      }
    });

    // const modal = require('@weex-module/modal');
    // modal.confirm({
    //     message: `卸载 ${data.appName} ?`,
    // }, (value) => {
    //     if (value.toLowerCase() === 'ok') {
    //       this.uninstallApp(data.packageName);
    //     }
    // });
  }

  hideMenu = () => {
    this.setState({
      menuVisable: false,
      menuPosition: {}
    });
  }

  uninstallApp = (packageName) => {
    this.hideMenu();

    const {data} = this.props;

    PkgManager.uninstallApp(data.packageName);
  }

  showAppInfo = () => {
    this.hideMenu();

    const {data} = this.props;

    PkgManager.showAppInfo(data.packageName);
  }

  render() {
    const {
      data,
      hideTitle,
      containerStyle = {},
      iconStyle = {}
    } = this.props;
    const {menuVisable, menuPosition} = this.state;

    if (!data || !data.appName) {
      return null;
    }

    const menuContainerStyle = {
      ...styles.menuContainer,
      ...menuPosition
    };

    return [
      <Touchable style={[styles.container, containerStyle]} onPress={this.launch} onLongPress={this.showMenu} ref="itemContainer">
        <appicon name={data.packageName} style={[styles.appicon, iconStyle]} />
        {hideTitle ? null : <Text style={styles.appName} numberOfLines={1}>{data.appName}</Text>}
      </Touchable>,
      menuVisable ?
      <View>
        <Touchable style={styles.transparentBG} onPress={this.hideMenu} />
        <View style={menuContainerStyle}>
          <Touchable style={styles.menuItem} onPress={this.uninstallApp}>
            <Text>Uninstall</Text>
          </Touchable>
          <Touchable style={styles.menuItem} onPress={this.showAppInfo}>
            <Text>App Info</Text>
          </Touchable>
        </View>
      </View>
      : null
    ];
  }
}

export default Mod;
